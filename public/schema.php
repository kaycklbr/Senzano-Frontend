<?php
header("Content-Type: application/xml; charset=UTF-8");

// Dados fixos ou buscados da API/banco
$data = [
    'name' => 'VRSync',
    'version' => '1.0',
    'date' => date('c')
];

// Gerar XML
$xml = new SimpleXMLElement('<schema/>');
foreach ($data as $key => $value) {
    $xml->addChild($key, htmlspecialchars($value));
}

// Retorna o XML
echo $xml->asXML();