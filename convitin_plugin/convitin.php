<?php
/**
 * Plugin Name: Convitin Module
 * Description: Plugin para gerenciar convites via REST API.
 * Version: 1.0
 * Author: Kayck L Brito
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'CONVITE_CRUD_PATH', plugin_dir_path( __FILE__ ) );

// Inclui arquivos
require_once CONVITE_CRUD_PATH . 'includes/post-type.php';
require_once CONVITE_CRUD_PATH . 'includes/api.php';

// Inicializa CPT
// add_action('init', 'convitin_register_convite_post_type');

// Inicializa rotas
add_action('rest_api_init', 'convitin_register_custom_routes');


// add_filter( 'user_row_actions', [ $this, 'convitin_user_row_actions' ], 10, 2 );

// public function convitin_user_row_actions( array $actions, WP_User $user ): array {
	

// 	if ( ! $link ) {
// 		return $actions;
// 	}

// 	$actions['login_as_user'] = sprintf(
// 		'<a href="%s">%s</a>',
// 		'https://app.convitin.com.br',
// 		'Entrar como'
// 	);

// 	return $actions;
// }


add_filter( 'user_row_actions', 'convitin_add_user_action', 10, 2 );

function convitin_add_user_action( $actions, $user ) {
    // (Opcional) Só mostra para administradores
    if ( ! current_user_can( 'manage_options' ) ) {
        return $actions;
    }
    
     $url = wp_nonce_url(
        admin_url( 'admin-post.php?action=convitin_custom_action&user_id=' . $user->ID ),
        'convitin_custom_action_' . $user->ID
    );

    // Define a URL e o texto do novo link
    $actions['login_as_user'] = '<a target="_blank" href="' . esc_url( $url ) . '">Entrar como</a>';

    return $actions;
}

add_action( 'admin_post_convitin_custom_action', 'convitin_handle_custom_action' );

function convitin_handle_custom_action() {

    // segurança básica
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( 'Sem permissão.' );
    }
    
    

    $user_id = isset( $_GET['user_id'] ) ? (int) $_GET['user_id'] : 0;


    
    // confirma nonce gerado no link
    check_admin_referer( 'convitin_custom_action_' . $user_id );
    if ( ! get_userdata( $user_id ) ) {
        wp_die( 'Usuário inválido.' );
    }
    
    $token = convitin_generate_jwt_for_user($user_id);
    
    if ( is_wp_error( $token ) ) {
        echo 'Erro: ' . $token->get_error_message();
    } else {
        $destino = 'https://app.convitin.com.br/s?token='.$token; 
        header('Location: ' . $destino );
        exit;
    }
    
    
}

function convitin_generate_jwt_for_user( $user_id ) {
    require_once WP_PLUGIN_DIR . '/jwt-auth/vendor/autoload.php';

    $user = get_userdata( $user_id );
    if ( ! $user ) {
        return new WP_Error( 'invalid_user', 'Usuário não encontrado.' );
    }

    // Tempo de expiração personalizado: 2 horas (em segundos)
    $expiration = time() + (2 * HOUR_IN_SECONDS);

    $issued_at = time();
    $not_before = $issued_at;
    
    $device = get_user_meta( $user->ID, 'jwt_auth_device', '' )[0] ?? '';
    $pass = get_user_meta( $user->ID, 'jwt_auth_pass', '' )[0] ?? '';

    // Cabeçalhos
    $token_payload = array(
        'iss'  => get_site_url(),
        'iat'  => $issued_at,
        'nbf'  => $not_before,
        'exp'  => $expiration,
        'data' => array(
            'user' => array(
                'id'        => $user->ID,
                'email'     => $user->user_email,
                'username'  => $user->user_login,
                'device'    => $device,
                'pass'      => $pass
            ),
        ),
    );

    // Chave secreta definida no wp-config.php
    $secret_key = defined( 'JWT_AUTH_SECRET_KEY' ) ? JWT_AUTH_SECRET_KEY : false;

    if ( ! $secret_key ) {
        return new WP_Error( 'jwt_no_secret', 'Chave secreta do JWT não está definida.' );
    }

    try {
        $token = Firebase\JWT\JWT::encode( $token_payload, $secret_key, 'HS256' );
        return $token;
    } catch ( Exception $e ) {
        return new WP_Error( 'jwt_encoding_error', 'Erro ao gerar token: ' . $e->getMessage() );
    }
}

