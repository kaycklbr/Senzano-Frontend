<?php
$apiUrl = 'https://api.senzano.com.br/api';
$title = 'Senzano Empreendimentos';
$description = 'Seu ecossistema imobiliário';
$image = '/images/fundo.webp';
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Handle property details
if (preg_match('/\/imovel\/(.+)/', $path, $matches)) {
    $slug = $matches[1];
    $response = @file_get_contents("$apiUrl/properties/$slug");
    if ($response) {
        $data = json_decode($response, true);
        if ($data && isset($data['title'])) {
            $title = $data['title'] . ' - Senzano Empreendimentos';
            $description = $data['description'] ?? $data['title'];
            $image = $data['cover_photo'] ? explode(',', $data['cover_photo'])[0] : $image;
        }
    }
}
// Handle empreendimentos
elseif (preg_match('/\/empreendimentos\/(.+)/', $path, $matches)) {
    $slug = $matches[1];
    $response = @file_get_contents("$apiUrl/public/post/$slug");
    if ($response) {
        $data = json_decode($response, true);
        if ($data && isset($data['title'])) {
            $title = $data['title'] . ' - Senzano Empreendimentos';
            $description = strip_tags($data['description'] ?? $data['title']);
            $image = $data['cover_image'] ?? $image;
        }
    }
}
// Handle lancamentos
elseif (preg_match('/\/lancamentos\/(.+)/', $path, $matches)) {
    $slug = $matches[1];
    $response = @file_get_contents("$apiUrl/public/post/$slug");
    if ($response) {
        $data = json_decode($response, true);
        if ($data && isset($data['title'])) {
            $title = $data['title'] . ' - Senzano Empreendimentos';
            $description = strip_tags($data['description'] ?? $data['title']);
            $image = $data['cover_image'] ?? $image;
        }
    }
}
// Handle pages
elseif (preg_match('/\/(.+)/', $path, $matches) && $matches[1] !== '') {
    
    
    $slug = $matches[1];
    if($slug == 'locacao'){
        $title = 'Locação - Senzano Empreendimentos';
        $description = 'Encontre imóveis para alugar';
    }elseif($slug == 'venda'){
        $title = 'Venda - Senzano Empreendimentos';
        $description = 'Encontre imóveis para comprar';
    }else{

        $response = @file_get_contents("$apiUrl/public/page/$slug");
        if ($response) {
            $data = json_decode($response, true);
            if ($data && isset($data['data']['title'])) {
                $title = $data['data']['title'] . ' - Senzano Empreendimentos';
                $rawDescription = strip_tags($data['data']['content'] ?? $data['data']['title']);
                $maxLength = 155;
                if (mb_strlen($rawDescription) > $maxLength) {
                    $description = mb_substr($rawDescription, 0, $maxLength - 3) . '...';
                } else {
                    $description = $rawDescription;
                }
            }
        }
    }


}

$metaTags = "<title>$title</title>
    <meta name=\"description\" content=\"$description\" />
    <meta property=\"og:type\" content=\"website\"/>
    <meta property=\"og:title\" content=\"$title\" />
    <meta property=\"og:description\" content=\"$description\" />
    <meta property=\"og:image\" content=\"$image\" />
    <meta name=\"twitter:card\" content=\"summary_large_image\" />
    <meta name=\"twitter:title\" content=\"$title\" />
    <meta name=\"twitter:description\" content=\"$description\" />
    <meta name=\"twitter:image\" content=\"$image\" />";

$html = file_get_contents('index.html');
echo str_replace('[HEAD]', $metaTags, $html);
?>