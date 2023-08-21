<?php
//Log de connexion au site public /log.txt
header('Content-Type: text/html; charset=utf-8');
function getClientIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

$timestamp = date('H:i:s d-m-Y');
$ip = getClientIP();
$userAgent = $_SERVER['HTTP_USER_AGENT'];
$xml = simplexml_load_file("http://www.geoplugin.net/xml.gp?ip=" . $ip);

// Utiliser mb_convert_encoding pour gérer correctement les caractères UTF-8
$logMessage = "
== [$timestamp] ==

User-Agent: $userAgent

IP Address: $ip

latitude: {$xml->geoplugin_latitude}, longitude: {$xml->geoplugin_longitude}

" . mb_convert_encoding($xml->geoplugin_continentName, "UTF-8", "ISO-8859-1") . ", " . mb_convert_encoding($xml->geoplugin_countryName, "UTF-8", "ISO-8859-1") . ", " . mb_convert_encoding($xml->geoplugin_regionCode, "UTF-8", "ISO-8859-1") . "
" . mb_convert_encoding($xml->geoplugin_regionName, "UTF-8", "ISO-8859-1") . ", " . mb_convert_encoding($xml->geoplugin_city, "UTF-8", "ISO-8859-1") . "

==
";

$logFile = "../../log.txt";
file_put_contents($logFile, $logMessage, FILE_APPEND | FILE_TEXT);
?>