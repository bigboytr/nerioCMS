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

    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });

    $app->add(function ($req, $res, $next) {
        $response = $next($req, $res);
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
        //->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });

    $app->post('/getAll', function(Request $request, Response $response) use ($basic) {

        // request params
        $params = json_decode($request->getBody());

        // view kullanmak gerekebilir.

        // find the item which will update
        $list = ORM::for_table($basic->resolveTableName($params->table))
            ->where_equal('deleted', 0)
            ->find_array();

        // Response
        return $response->withJson($list);

    });

    $app->post('/save', function (Request $request, Response $response) use ($basic) {

        $exclude = ['update', 'id'];

        // request params
        $params = json_decode($request->getBody());
        $update = intval($params->dto->id) !== 0 ? true : false;

        if ($update) {
            // find the item which will update
            $item = ORM::for_table($basic->resolveTableName($params->table))->find_one(intval($params->dto->id));
        } else {
            $item = ORM::for_table($basic->resolveTableName($params->table))->create();
        }

        foreach ($params->dto as $key => $value){

            if (in_array($key, $exclude)) continue;

            if ($key === "createdDate" || $key === "modifiedDate") {
                $value = date("Y-m-d H:i:s");
            }
            $item[$key] = $value;
        }

        // ORM CRUD action will affect in this inner function
        $result = $basic->ormAction($item);

        // Response
        return $response->withJson($result);

    });

    $app->delete("/delete", function(Request $request, Response $response) use ($basic) {

        // request params
        $params = json_decode($request->getBody());

        $item = ORM::for_table($basic->resolveTableName($params->table))->find_one(intval($params->id));

        $item->set("modifiedDate", date("Y-m-d H:i:s"));
        $item->set("deleted", 1);

        // ORM CRUD action will affect in this inner function
        $result = $basic->ormAction($item);

        return ($result->type === "error") ? false : true;
        // Response
        //return $response->withJson($result);

    });

    $app->post('/activate', function (Request $request, Response $response) use ($basic) {

        // request params
        $params = json_decode($request->getBody());

        // find the item which will update
        $item = ORM::for_table($basic->resolveTableName($params->table))->find_one($params->id);

        // toggle the active column
        $act = intval($item->active) == 1 ? 0 : 1;

        // set the new value of selected row from DB
        $item->set("active", $act);
        //$item->set("modifiedDate", $params->modifiedDate);
        $item->set("modifiedDate", date("Y-m-d H:i:s"));
        $item->set("modifiedBy", $params->modifiedBy);

        // ORM CRUD action will affect in this inner function
        $result = $basic->ormAction($item);

        // Response
        return ($result->type === "error") ? false : true;
        //return $response->withJson($result);

    });

    $app->post('/upload-file', function (Request $request, Response $response) use ($basic) {

        // request params
        $params = json_decode($request->getBody());

        echo '<pre>';
        print_r($params);
        echo '</pre>';

    });

});

$app->run();