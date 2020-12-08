<?php

/**
 * Views
 * 
 * Include views with js and css, and dependencies if contains import (modules)
 * Add app.js with dependencies if contains import (modules)
 * 
 */

$json = json_decode(file_get_contents("assets/views.json"), true);
$views = array();

function views($name, $args = null){
    global $views;
    
    include("./assets/views/$name/index.php");
    if (!in_array($name, $views)){ 
        array_push($views, $name);
    }
}

function views_assets(){
    global $views;
    global $json;
    $json_views = $json["views"];
    $json_modules = $json["modules"];
    $json_app = $json["app"];
    echo "\r\t";

    function insert($key){
        if($key["css"]){
            echo '<link href="' . $key["css"] . '" rel="stylesheet" type="text/css">' . "\r\t";
        }
        if($key["js"]){
            echo '<script type="module" src="' . $key["js"] . '"></script>' . "\r\t";
        }
    }

    for($i = 0; $i < sizeof($views); $i++){
        $name = $views[$i];
        $dependencies = $json_views[$name]["dependencies"];
        
        if($dependencies){
            for($u = 0; $u < sizeof($dependencies); $u++){
                insert($json_modules[$dependencies[$u]]);
            }
        }
        insert($json_views[$name]);
    }
    for($i = 0; $i < sizeof($json_app); $i++){
        insert($json_modules[$json_app[$i]]);
    }
}