<?php

    //session_register("oper_id");
    
    //$_METHOD =  $_GET ? $_GET["method"] : $_POST["method"];

    
    $rows  = [];
    $rows[0] = array('id' => 1, 'name'=>'张三', 'url' => '/Image/ext.gif', 'lastmod' => '2019-09-14','state'=>1);
    $rows[1] = array('id' => 2, 'name'=>'李四', 'url' => '/Image/ext.gif',  'lastmod' => '2019-09-14','state'=>0);
    $rows[2] = array('id' => 3, 'name'=>'王五', 'url' => '/Image/grid.png', 'lastmod' => '2019-09-14','state'=>1);
  
    $errors= [];
    $data  = array('results' => 3, 
        'rows' => $rows, 
        'success' => true, 
        'errors' => $errors);
    $json  = json_encode($data);
    header("Content-type:application/json; charset=UTF-8");
    echo  $json;

   
?>
