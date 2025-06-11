<?php

function convitin_register_convite_post_type() {
    register_post_type('convite', array(
        'labels' => array(
            'name' => 'Convites',
            'singular_name' => 'Convite'
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rewrite' => ['slug' => 'convite'],
        'supports' => array('title', 'editor', 'custom-fields'),
        'publicly_queryable' => true
    ));
}
