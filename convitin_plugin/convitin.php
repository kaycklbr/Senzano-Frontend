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
// require_once CONVITE_CRUD_PATH . 'includes/post-type.php';
require_once CONVITE_CRUD_PATH . 'includes/api.php';

// Inicializa CPT
// add_action('init', 'convitin_register_convite_post_type');

// Inicializa rotas
add_action('rest_api_init', 'convitin_register_custom_routes');