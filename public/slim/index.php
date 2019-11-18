<?php
/**
 * Created by PhpStorm.
 * User: yasin
 * Date: 8.11.2019
 * Time: 11:55
 */

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Slim\App;


/* Basic Class init */
require 'classes/basic.php';
$basic = new \basic\basic();

/* Recursive List init */
require 'classes/recursiveList.php';
$recursiveList = new \recursiveList\recursiveList();

require 'classes/idiorm.php';
ORM::configure(array(
    'connection_string' => 'mysql:host=localhost;dbname='.dbN,
    'username' => dbU,
    'password' => dbP
));

// Slim framework
require 'vendor/autoload.php';

$app = new \Slim\App;



$app->group('/api', function (App $app) use ($basic) {

    $app->post('/getAll', function(Request $request, Response $response) use ($basic) {

        // request params
        $params = json_decode($request->getBody());

        // view kullanmak gerekebilir.

        // find the item which will update
        $list = ORM::for_table($basic->resolveTableName($params->table))->find_array();

        // Response
        return $response->withJson($list);

    });

    $app->post('/save', function (Request $request, Response $response) use ($basic) {

        // request params
        $params = json_decode($request->getBody());

        // find the item which will update
        $item = ORM::for_table($params->table)->find_one(intval($params->id));

        // toggle the active column
        $act = intval($item->active) == 1 ? 0 : 1;

        // set the new value of selected row from DB
        $item->set("active",$act);

        /*// ORM CRUD action will affect in this inner function
        $result = $basic->ormAction($item);

        // Response
        $response->withJson($result);*/

    });

    $app->post('/activate', function (Request $request, Response $response) use ($basic) {

        // request params
        $params = json_decode($request->getBody());

        // find the item which will update
        $item = ORM::for_table($basic->resolveTableName($params->table))->find_one($params->id);

        // toggle the active column
        $act = intval($item->active) == 1 ? 0 : 1;

        // set the new value of selected row from DB
        $item->set("active",$act);
        $item->set("modifiedDate", $params->modifiedDate);
        $item->set("modifiedBy", $params->modifiedBy);

        // ORM CRUD action will affect in this inner function
        $result = $basic->ormAction($item);

        // Response
        $response->withJson($result);

    });

});

$app->run();