<?php

function get()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else
        $ip = $_SERVER['REMOTE_ADDR'];

    return $ip;
}

$timestamp = date('H:i:s d-m-Y');
$ip = get();
$userAgent = $_SERVER['HTTP_USER_AGENT'];
$xml = simplexml_load_file("http://www.geoplugin.net/xml.gp?ip=" . $ip);

$logMessage = "\n== [$timestamp] ==\n\n";
$logMessage .= "\tUser-Agent: $userAgent\n\n";
$logMessage .= "\tIP Address: $ip\n\n";
$logMessage .= "\t\t latitude: " . $xml->geoplugin_latitude . ", longitude: " . $xml->geoplugin_longitude . "\n\n";
$logMessage .= "\t\t " . mb_convert_encoding($xml->geoplugin_continentName, "ISO-8859-1", "UTF-8") . ", " . mb_convert_encoding($xml->geoplugin_countryNam, "ISO-8859-1", "UTF-8") . ", " . mb_convert_encoding($xml->geoplugin_regionCode, "ISO-8859-1", "UTF-8") . "\n";
$logMessage .= "\t\t " . mb_convert_encoding($xml->geoplugin_regionName, "ISO-8859-1", "UTF-8") . ", " . mb_convert_encoding($xml->geoplugin_city, "ISO-8859-1", "UTF-8") . "\n";
$logMessage .= "\n==\n";

$logFile = "../../log.txt";
file_put_contents($logFile, $logMessage, FILE_APPEND | FILE_TEXT);
?>