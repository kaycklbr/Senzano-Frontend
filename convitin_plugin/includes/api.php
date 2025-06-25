<?php

function convitin_register_custom_routes() {
    
    register_rest_route('convitin/v1', '/me', [
        'methods'  => 'GET',
        'callback' => 'convitin_me',
        'permission_callback' => 'is_user_logged_in'
    ]);
    
    register_rest_route('convitin/v1', '/change-password', [
        'methods'  => 'post',
        'callback' => 'convitin_change_user_password',
        'permission_callback' => 'is_user_logged_in'
    ]);
    
    register_rest_route('convitin/v1', '/send-reset', [
        'methods'  => 'post',
        'callback' => 'custom_send_reset_password_link'
    ]);
    
    register_rest_route('convitin/v1', '/reset', [
        'methods'  => 'post',
        'callback' => 'custom_reset_user_password'
    ]);
    
    register_rest_route('convitin/v1', '/update-status/(?P<id>\d+)', [
        'methods'  => 'post',
        'callback' => 'convitin_update_status'
    ]);
    
    register_rest_route('convitin/v1', '/convites', [
        'methods'  => 'GET',
        'callback' => 'convitin_list_convite',
        'permission_callback' => 'is_user_logged_in'
    ]);
    
    register_rest_route('convitin/v1', '/convites', [
        'methods'  => 'POST',
        'callback' => 'convitin_create_convite',
        'permission_callback' => 'is_user_logged_in',
    ]);

    register_rest_route('convitin/v1', '/convites/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => 'convitin_get_convite',
        'permission_callback' => 'is_user_logged_in',
    ]);

    register_rest_route('convitin/v1', '/convites/edit/(?P<id>\d+)', [
        'methods'  => 'POST',
        'callback' => 'convitin_update_convite',
        'permission_callback' => 'is_user_logged_in',
    ]);

    register_rest_route('convitin/v1', '/convites/(?P<id>\d+)', [
        'methods'  => 'DELETE',
        'callback' => 'convitin_delete_convite',
        'permission_callback' => 'is_user_logged_in',
    ]);
    
    register_rest_route('convitin/v1', '/templates', [
        'methods'  => 'GET',
        'callback' => 'convitin_list_templates'
    ]);
    
    register_rest_route('convitin/v1', '/submissions/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => 'convitin_get_convite_submissions',
        'permission_callback' => 'is_user_logged_in'
    ]);
    
    register_rest_route(
        'convitin/v1',
        '/register',
        array(
            array(
                'methods'  => 'POST',
                'callback' => 'convitin_post_register_callback',
            ),
        )
    );
}

function convitin_me() {
    $user = wp_get_current_user();

    return new WP_REST_Response([
        'id'    => $user->ID,
        'name'  => $user->display_name,
        'email' => $user->user_email,
        'roles' => $user->roles,
    ], 200);
}

function custom_send_reset_password_link($request) {
    $email = sanitize_email($request->get_param('email'));
    $user = get_user_by('email', $email);

    if (!$user) {
        return new WP_Error('invalid_user', 'Usuário não encontrado.', ['status' => 404]);
    }

    // Gera o token de redefinição
    $reset_key = get_password_reset_key($user);
    if (is_wp_error($reset_key)) {
        return new WP_Error('reset_error', 'Não foi possível gerar o token.', ['status' => 500]);
    }

    // Cria o link de redefinição
    $reset_url = add_query_arg([
        'key' => $reset_key,
        'login' => rawurlencode($user->user_email)
    ], 'https://app.convitin.com.br/reset');

    // Envia o e-mail (opcional)
    $sent = wp_mail(
        $user->user_email,
        'Redefinição de senha',
        "Olá {$user->display_name},\n\nPara redefinir sua senha, clique no link abaixo:\n\n$reset_url"
    );

    if (!$sent) {
        return new WP_Error('email_error', 'Não foi possível enviar o e-mail.', ['status' => 500]);
    }

    return rest_ensure_response([
        'success' => true,
        'message' => 'Link de redefinição enviado para o e-mail.',
        'reset_url' => $reset_url // opcional — remova se quiser ocultar
    ]);
}

function custom_reset_user_password($request) {
    $login = sanitize_text_field($request->get_param('login'));
    $key   = sanitize_text_field($request->get_param('key'));
    $password = $request->get_param('password');

    if (empty($login) || empty($key) || empty($password)) {
        return new WP_Error('missing_fields', 'Parâmetros ausentes.', ['status' => 400]);
    }

    $user = get_user_by('login', $login);
    if (!$user) {
        return new WP_Error('invalid_user', 'Usuário inválido.', ['status' => 404]);
    }

    $check = check_password_reset_key($key, $login);
    if (is_wp_error($check)) {
        return new WP_Error('invalid_key', 'Chave de redefinição inválida ou expirada.', ['status' => 403]);
    }

    // Atualiza a senha
    reset_password($user, $password);

    return rest_ensure_response([
        'success' => true,
        'message' => 'Senha redefinida com sucesso.',
    ]);
}

function convitin_change_user_password($request) {
    $user = wp_get_current_user();

    $old_password = $request->get_param('current_password');
    $new_password = $request->get_param('new_password');

    if (empty($old_password) || empty($new_password)) {
        return new WP_Error('missing_fields', 'Campos obrigatórios ausentes.', ['status' => 400]);
    }

    // Verifica se a senha atual está correta
    if (!wp_check_password($old_password, $user->user_pass, $user->ID)) {
        return new WP_Error('invalid_password', 'Senha atual incorreta.', ['status' => 403]);
    }

    // Altera a senha
    wp_set_password($new_password, $user->ID);

    return rest_ensure_response([
        'success' => true,
        'message' => 'Senha alterada com sucesso.'
    ]);
}

function convitin_post_register_callback ($data) {
	
	$name = sanitize_user($data['name']);
    $email = sanitize_email($data['email']);
    $password = $data['password'];

    // Verifica se o username e o email são válidos
    if (empty($email) || empty($password) || !is_email($email)) {
        return new WP_Error('invalid_data', __('Dados de usuário inválidos.'), array('status' => 400));
    }

    

    // Cria o novo usuário
    $user_id = wp_create_user($email, $password, $email);

    if (is_wp_error($user_id)) {
        return new WP_Error('registration_error', __('Erro ao registrar novo usuário.'), array('status' => 500, 'errors' => $user_id->errors));
    }
    
    wp_update_user([
        'ID' => $user_id,
        'display_name' => $name,
        'first_name' => $name,
    ]);
	
	$response = new WP_REST_Response(array(
        'message' => __('Usuário criado com sucesso.'),
        'user_id' => $user_id,
    ));
	return $response;
}

// CREATE
function convitin_create_convite($request) {
    
    $title = sanitize_text_field($request->get_param('title'));
    $slug = sanitize_textarea_field($request->get_param('slug'));
    $status = sanitize_textarea_field($request->get_param('status'));
    
    if(!isset($_POST['template_id']) or empty($_POST['template_id'])){
        $_POST['template_id'] = 10845;
    }

    $post_id = wp_insert_post([
        'post_type' => 'page',
        'post_title' => $title,
        'post_content' => "",
        'post_name' => $slug,
        'post_status' => (!isset($_POST['status']) || $status == 'publish') ? 'publish' : 'draft',
    ]);
    
    wp_update_post([
        'ID' => $post_id,
        'post_content' => "[elementor-template id=\"{$_POST['template_id']}\"]"
    ]);

    if (is_wp_error($post_id)) {
        return new WP_Error('insert_error', 'Erro ao criar convite.', ['status' => 500]);
    }
    
    $meta_fields = [
        'description', 'event_date', 'enable_ceremony', 'ceremony_date', 'ceremony_time', 'ceremony_location', 'ceremony_address',
        'enable_party', 'party_date', 'party_time', 'party_location', 'party_address',
        'dress_code', 'observations', 'owner_instagram', 'enable_gift', 'gift_link',
        'background_music', 'start_background_music', 'template_id', 'hide_acompanhante'
    ];
    
    update_post_meta($post_id, 'hide_acompanhante', '');
    update_post_meta($post_id, 'is_convite', '1');
    
    

    foreach ($meta_fields as $field) {
        if (isset($_POST[$field])) {
            $value = is_array($_POST[$field]) ? array_map('sanitize_text_field', $_POST[$field]) : sanitize_text_field($_POST[$field]);
            if($field == 'owner_instagram'){
                $value = str_replace(',', '<br>', $value);
            }
            update_post_meta($post_id, $field, $value);
        }
    }
    
    update_post_meta($post_id, '_yoast_wpseo_meta-robots-noindex', '1');
    update_post_meta($post_id, '_yoast_wpseo_meta-robots-nofollow', '1');
    
    $current_user = wp_get_current_user();
    $email = $current_user->user_email;
    update_post_meta($post_id, 'author_email', $email);
    
    if (!empty($_FILES['main_image'])) {
        $file = [
            'name'     => $_FILES['main_image']['name'],
            'type'     => $_FILES['main_image']['type'],
            'tmp_name' => $_FILES['main_image']['tmp_name'],
            'error'    => $_FILES['main_image']['error'],
            'size'     => $_FILES['main_image']['size']
        ];

        $_FILES['image'] = $file; // necessário para `media_handle_upload`

        require_once ABSPATH . 'wp-admin/includes/image.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        $attachment_id = media_handle_upload('image', 0);
        if (!is_wp_error($attachment_id)) {
            update_post_meta($post_id, 'main_image', $attachment_id);
            set_post_thumbnail( $post_id, $attachment_id );
        }
    } else {
        if(!isset($_POST['main_image'])){
            delete_post_thumbnail($post_id);
        }
    }
    
    $image_ids = [];
    if (!empty($_FILES['gallery'])) {

        foreach ($_FILES['gallery']['name'] as $i => $name) {
            $file = [
                'name'     => $_FILES['gallery']['name'][$i],
                'type'     => $_FILES['gallery']['type'][$i],
                'tmp_name' => $_FILES['gallery']['tmp_name'][$i],
                'error'    => $_FILES['gallery']['error'][$i],
                'size'     => $_FILES['gallery']['size'][$i],
            ];

            $_FILES['image'] = $file; // necessário para `media_handle_upload`

            require_once ABSPATH . 'wp-admin/includes/image.php';
            require_once ABSPATH . 'wp-admin/includes/file.php';
            require_once ABSPATH . 'wp-admin/includes/media.php';

            $attachment_id = media_handle_upload('image', $post_id);

            if (!is_wp_error($attachment_id)) {
                $image_ids[] = $attachment_id;
            }
        }

        // Salva os IDs das imagens no post meta
        if (!empty($image_ids)) {
            update_post_meta($post_id, 'convitin_galeria', $image_ids);
        }
    }
    
    $internal_meta = convitin_prepare_meta_classes([ 'gallery' => $image_ids]);
    foreach($internal_meta as $f => $v){
        update_post_meta($post_id, $f, $v);
    }
    
    $thumbnail_id = get_post_thumbnail_id($post_id);
    update_post_meta($post_id, 'css_featured_image', $thumbnail_id ? '' : 'hide');
    

    return new WP_REST_Response(['message' => 'Convite criado com sucesso.', 'id' => $post_id], 201);
}

// READ
function convitin_list_convite($request) {
    $args = [
        'post_type'      => 'page',
        'posts_per_page' => -1,
        'post_status'    => 'any',
        'author'   => get_current_user_id(),
        'meta_key'   => 'is_convite',
        'meta_value' => '1',
    ];

    $query = new WP_Query($args);
    $convites = [];

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            
            $thumbnail_id = get_post_thumbnail_id($post_id);
            $thumbnail_url = $thumbnail_id ? wp_get_attachment_url($thumbnail_id) : null;

            $convites[] = [
                'id'          => get_the_ID(),
                'title'       => html_entity_decode(get_the_title()),
                'description' => get_the_content(),
                'slug'        => get_permalink(get_the_ID()),
                'status'      => get_post_status(get_the_ID()),
                'meta'        => get_post_meta(get_the_ID()),
                'main_image'  => $thumbnail_url,
                'totals'    => convitin_get_convite_submissions(['id' => get_the_ID()], true)
            ];
        }
    }

    wp_reset_postdata();

    return new WP_REST_Response($convites, 200);
}

function convitin_flatten_meta($meta_raw) {
    $meta = [];

    foreach ($meta_raw as $key => $value) {
        // Se tiver só um item no array, retorna o valor direto
        $_value = count($value) === 1 ? maybe_unserialize($value[0]) : array_map('maybe_unserialize', $value);
            
        if($_value === "false"){
            $_value = false;
        }else if($_value === "true"){
            $_value = true;
        }else if($_value === "null"){
            $_value = null;
        }
        
        if($key == 'owner_instagram'){
            $_value = str_replace('<br>', ',', $_value);
        }
        
        $meta[$key] = $_value;
    }

    return $meta;
}

function get_youtube_video_id($url) {
    preg_match(
        '/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^\&\?\/]+)/',
        $url,
        $matches
    );
    return $matches[1] ?? null;
}

function convitin_prepare_meta_classes($custom = []){
    
    $event_date = $_POST['event_date'] ?? '';


    $render_event_date = '';
    if ($event_date) {
        try {
            $date = new DateTime($event_date);
            $render_event_date = $date->format('d.m.Y');
        } catch (Exception $e) {
            $render_event_date = $event_date; // Ou logar o erro
        }
    }
    
    $css_ceremony = $_POST['enable_ceremony'] === 'true' ? '' : 'hide';
    $css_party = $_POST['enable_party'] === 'true' ? '' : 'hide';
    
    $render_ceremony_date = '';
    
    if($_POST['enable_ceremony'] === 'true'){
        $ceremony_date = $_POST['ceremony_date'] ?? '';
        $ceremony_time = $_POST['ceremony_time'] ?? '';
        $ceremony_date = "$ceremony_date $ceremony_time";
        if ($ceremony_date) {
            try {
                $dt = new DateTime($ceremony_date);
        
                setlocale(LC_TIME, 'pt_BR.utf8', 'pt_BR', 'Portuguese_Brazil');
        
               $render_ceremony_date = strftime('%d de %B de %Y às %H:%M', $dt->getTimestamp());
        
            } catch (Exception $e) {
                $render_ceremony_date = $ceremony_date;
            }
        }
        
    }
    
    $render_party_date = '';
    
    if($_POST['enable_party'] === 'true'){
        $party_date = $_POST['party_date'] ?? '';
        $party_time = $_POST['party_time'] ?? '';
        $party_date = "$party_date $party_time";
        if ($party_date) {
            try {
                $dt = new DateTime($party_date);
        
                setlocale(LC_TIME, 'pt_BR.utf8', 'pt_BR', 'Portuguese_Brazil');
        
               $render_party_date = strftime('%d de %B de %Y às %H:%M', $dt->getTimestamp());
        
            } catch (Exception $e) {
                $render_party_date = $party_date;
            }
        }
    }
    
    $css_gift = (isset($_POST['enable_gift']) and $_POST['enable_gift'] === "true" ) ? '' : 'hide';
    $css_dress_code = !empty($_POST['dress_code']) ? '' : 'hide';
    $css_observations = !empty($_POST['observations']) ? '' : 'hide';
    $js_youtube_music = '';
    
    if(!empty($_POST['background_music'])){
        $videoId = get_youtube_video_id($_POST['background_music']);
        $videoStart = $_POST['start_background_music'];
        
        $js_youtube_music = "[youtube_embed id=\"$videoId\" start=\"$videoStart\"]";
    }
    
    $css_gallery = '';
    if(isset($custom['gallery']) and empty($custom['gallery'])){
        $css_gallery = 'hide';
    }
    
    return [
        'render_event_date' => $render_event_date, 
        'render_ceremony_date' => $render_ceremony_date, 
        'render_party_date' => $render_party_date,
        'css_ceremony' => $css_ceremony, 
        'css_party' => $css_party, 
        'css_dress_code' => $css_dress_code, 
        'css_gift' => $css_gift, 
        'css_observations' => $css_observations,
        'js_youtube_music' => $js_youtube_music,
        'css_gallery' => $css_gallery
    ];
    
}

// READ
function convitin_get_convite($request) {
    $post_id = $request['id'];
    $post = get_post($post_id);

    if (!$post) {
        return new WP_Error('not_found', 'Convite não encontrado.', ['status' => 404]);
    }
    
    $meta_raw = get_post_meta($post_id);
    $meta = convitin_flatten_meta($meta_raw);

    // Imagem principal (ID de attachment)
    $main_image_id = get_post_thumbnail_id($post_id);
    $main_image = null;
    

    if ($main_image_id) {
        $main_image = [
            'id'  => $main_image_id,
            'url' => wp_get_attachment_url($main_image_id),
        ];
    }

    // Galeria (array serializado de IDs)
    $galeria_ids = isset($meta['convitin_galeria']) ? maybe_unserialize($meta['convitin_galeria']) : [];
    $galeria = [];

    if (is_array($galeria_ids)) {
        foreach ($galeria_ids as $img_id) {
            $img_id = intval($img_id);
            if (get_post($img_id)) {
                $galeria[] = [
                    'id'  => $img_id,
                    'url' => wp_get_attachment_url($img_id),
                ];
            }
        }
    }
    
    
    $response = [
        'id' => $post->ID,
        'title' => html_entity_decode($post->post_title),
        'slug' => $post->post_name,
        'url' => get_permalink($post->ID),
        'description' => $post->post_content,
        'status' => $post->post_status,
        
    ];
    
    $response = array_merge($response, $meta);
    $response['main_image'] = $main_image;
    $response['gallery'] = $galeria;

    return $response;
}

// UPDATE
function convitin_update_convite($request) {
    try{
    $post_id = (int) $request->get_param('id');
    $post = get_post($post_id);

    if (!$post || $post->post_type !== 'page' || $post->post_author != get_current_user_id() || get_post_meta($post_id, 'is_convite', true) !== '1') {
        return new WP_Error('not_found', 'Convite não encontrado.', ['status' => 404]);
    }

    // Atualiza título e slug
    $title = sanitize_text_field($request->get_param('title'));
    $slug  = sanitize_title($request->get_param('slug'));
    $templateId  = sanitize_title($request->get_param('template_id'));
    $status  = sanitize_title($request->get_param('status'));
    
    wp_update_post([
        'ID'          => $post_id,
        'post_title'  => $title,
        'post_name'   => $slug,
        'post_content' => "[elementor-template id=\"$templateId\"]",
        'post_status' => $status,
    ]);

    // Atualiza meta fields
    $meta_fields = [
        'description', 'event_date', 'enable_ceremony', 'ceremony_date', 'ceremony_time', 'ceremony_location', 'ceremony_address',
        'enable_party', 'party_date', 'party_time', 'party_location', 'party_address',
        'dress_code', 'observations', 'owner_instagram', 'enable_gift', 'gift_link',
        'background_music', 'start_background_music', 'template_id', 'hide_acompanhante'
    ];
    
    foreach ($meta_fields as $field) {
        if (isset($_POST[$field])) {
            $value = is_array($_POST[$field]) ? array_map('sanitize_text_field', $_POST[$field]) : sanitize_text_field($_POST[$field]);
            if($field == 'owner_instagram'){
                $value = str_replace(',', '<br>', $value);
            }
            update_post_meta($post_id, $field, $value);
        }
    }
    
    $current_user = wp_get_current_user();
    $email = $current_user->user_email;
    update_post_meta($post_id, 'author_email', $email);
    
    // ✅ Atualiza imagem principal
    if (!empty($_FILES['main_image'])) {
        
        $file = [
            'name'     => $_FILES['main_image']['name'],
            'type'     => $_FILES['main_image']['type'],
            'tmp_name' => $_FILES['main_image']['tmp_name'],
            'error'    => $_FILES['main_image']['error'],
            'size'     => $_FILES['main_image']['size']
        ];
        
        require_once ABSPATH . 'wp-admin/includes/image.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        
        $_FILES['image'] = $file;
        $attachment_id = media_handle_upload('image', 0);
         
        if (!is_wp_error($attachment_id)) {
            update_post_meta($post_id, 'main_image', $attachment_id);
            set_post_thumbnail($post_id, $attachment_id);
        }
    }else{
        if(!isset($_POST['main_image'])){
            delete_post_thumbnail($post_id);
        }
    }

    // ✅ Atualiza galeria
    $final_gallery_ids = [];

    // Parte 1: IDs antigos ainda válidos
    if (!empty($_POST['existing_gallery']) && is_array($_POST['existing_gallery'])) {
        foreach ($_POST['existing_gallery'] as $id) {
            $final_gallery_ids[] = intval($id); // mantém imagem antiga
        }
    }

    // Parte 2: Novas imagens
    if (!empty($_FILES['gallery'])) {
        foreach ($_FILES['gallery']['name'] as $i => $name) {
            $file = [
                'name'     => $_FILES['gallery']['name'][$i],
                'type'     => $_FILES['gallery']['type'][$i],
                'tmp_name' => $_FILES['gallery']['tmp_name'][$i],
                'error'    => $_FILES['gallery']['error'][$i],
                'size'     => $_FILES['gallery']['size'][$i],
            ];

            $_FILES['image'] = $file;

            require_once ABSPATH . 'wp-admin/includes/image.php';
            require_once ABSPATH . 'wp-admin/includes/file.php';
            require_once ABSPATH . 'wp-admin/includes/media.php';
            
            $attachment_id = media_handle_upload('image', $post_id);
            if (!is_wp_error($attachment_id)) {
                $final_gallery_ids[] = $attachment_id;
            }
        }
        
    }
    
    $attachments = get_children([
        'post_parent'    => $post_id,
        'post_type'      => 'attachment',
        'post_mime_type' => 'image',
        'numberposts'    => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC'
    ]);
    
    
    foreach ($attachments as $attachment) {
        if(!in_array($attachment->ID, $final_gallery_ids)){
            wp_delete_attachment($attachment->ID, true);
        }
    }
    
    $internal_meta = convitin_prepare_meta_classes([ 'gallery' => $final_gallery_ids]);
    foreach($internal_meta as $f => $v){
        update_post_meta($post_id, $f, $v);
    }
    
    $thumbnail_id = get_post_thumbnail_id($post_id);
    update_post_meta($post_id, 'css_featured_image', $thumbnail_id ? '' : 'hide');
    

    update_post_meta($post_id, 'convitin_galeria', $final_gallery_ids);

    return new WP_REST_Response(['message' => 'Convite atualizado.'], 200);
        
    }catch(Exception $e){
         return new WP_Error('invalid_post', $e->getMessage(), ['status' => 404]);
    }
}

// DELETE
function convitin_delete_convite($request) {
    $post_id = $request['id'];

    $deleted = wp_delete_post($post_id, true);

    if (!$deleted) {
        return new WP_Error('delete_error', 'Erro ao excluir convite.', ['status' => 500]);
    }

    return new WP_REST_Response(['message' => 'Convite excluído.'], 200);
}

function convitin_list_templates($request) {
    $args = [
        'post_type'      => 'elementor_library',
        'posts_per_page' => -1,
        'post_status'    => 'any',
        'meta_key'   => 'is_template',
        'meta_value' => '1',
        'orderby'   => 'ID',
        'order'     => 'ASC'
    ];

    $query = new WP_Query($args);
    $templates = [];

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            
            $thumbnail_id = get_post_thumbnail_id(get_the_ID());
            $thumbnail_url = $thumbnail_id ? wp_get_attachment_url($thumbnail_id) : null;
            $templates[] = [
                'id'          => get_the_ID(),
                'title'       => get_the_title(),
                'description' => get_the_content(),
                'status'      => get_post_status(get_the_ID()),
                'main_image'  => $thumbnail_url
            ];
        }
    }

    wp_reset_postdata();

    return new WP_REST_Response($templates, 200);
}


function convitin_get_convite_submissions($request, $return = false) {
    global $wpdb;

    $post_id = intval($request['id']);
    $form_name = 'Formulário Farm';

    $submissions_table = $wpdb->prefix . 'e_submissions';
    $values_table      = $wpdb->prefix . 'e_submissions_values';

    // Buscar submissões do formulário para o post
    $submissions = $wpdb->get_results(
        $wpdb->prepare("
            SELECT * FROM $submissions_table
            WHERE EXISTS (SELECT 1 FROM $values_table WHERE submission_id = $submissions_table.id AND `key` = 'form_post_id' AND value = %s)
            ORDER BY created_at DESC
        ", $post_id),
        ARRAY_A
    );
    
    $count_confirmed = 0;
    $count_not_confirmed = 0;
    $total_people_confirmed = 0;

    $data = [];

    foreach ($submissions as $submission) {
        $submission_id = $submission['id'];

        // Buscar os valores da submissão
        $values = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM $values_table WHERE submission_id = %d", $submission_id),
            ARRAY_A
        );

        $campos = [];
        
        $atlas = [
            'field_56ea902' => 'email',
            'email' => 'confirmed',
            'name' => 'name',
            'field_7e1b37b' => 'acompanhante'
        ];
        
        foreach ($values as $campo) {
            $campos[$atlas[$campo['key']] ?? $campo['key']] = $campo['value'];
        }
        
        $confirmation = strtolower(trim($campos['confirmed'] ?? ''));
        if ($confirmation === 'sim' || $confirmation === 'confirmado') {
            $confirmed = true;
            $count_confirmed++;

            $acompanhante = isset($campos['acompanhante']) && trim($campos['acompanhante']) !== '' ? 1 : 0;
            $total_people_confirmed += 1 + $acompanhante;
        } else {
            $count_not_confirmed++;
        }

        $data[] = [
            'id'            => $submission_id,
            'submitted_at'  => $submission['created_at'],
            'fields'        => $campos,
        ];
    }
    
    $response = [
        'total_submissions'     => count($data),
        'confirmed_count'       => $count_confirmed,
        'not_confirmed_count'   => $count_not_confirmed,
        'total_people_confirmed'=> $total_people_confirmed,
        'result' => $data
    ];
    
    if($return){
        return $response;
    }

    return rest_ensure_response($response);
}

function convitin_update_status($request) {
    $post_id = $request['id'];
    $post = get_post($post_id);

    if (!$post || $post->post_author != get_current_user_id()) {
        return new WP_Error('not_found', 'Convite não encontrado.', ['status' => 404]);
    }
    
    
    wp_update_post([
        'ID' => $post->ID,
        'post_status' => $_POST['status'] ?? 'draft'
    ]);
    
    return rest_ensure_response(['message' => 'Atualizado com sucesso']);
}