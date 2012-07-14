<?php

require_once __DIR__.'/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

$app->before(function () use ($app)
{
	$app['db'] = null;
    try {
        $app['db'] = new PDO('mysql:dbname=crudext;host=localhost','root','magd');
        $app['db']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
    }
    catch(PDOException $e) {
        //Tratamos la excepción...
    }
});


$app->get('/usuario', function(Request $request) use ($app) {

	$start = $request->query->get('start',0);
	$limit = $request->query->get('limit',20);

    try {
        $sql = "SELECT SQL_CALC_FOUND_ROWS * FROM usuarios LIMIT :atts,:attl";
        $sth = $app['db']->prepare($sql);
        $sth->bindValue(':atts',intval($start), PDO::PARAM_INT);
        $sth->bindValue(':attl',intval($limit), PDO::PARAM_INT);
        $sth->execute();

        $results = $sth->fetchAll();

        $sql = "SELECT FOUND_ROWS() cant";
        $sth = $app['db']->prepare($sql);
        $sth->execute();
        $result = $sth->fetch(PDO::FETCH_ASSOC);

        if(count($results) == 0) $response = new Response('',404);
        else {
            $response = new Response($app['twig']->render('list.json.twig',
                    array(
                        'usuarios' => $results,
                        'total' => $result['cant']
                    )),
                    200
                );
        }
    }
    catch(PDOException $e) {
        $response = new Response('',404);
    }

    return $response;

});

$app->put('/usuario/{id}', function(Request $request,$id) use ($app) {

    $info = json_decode($request->getContent(),true);

    try {
        $sql = "UPDATE usuarios SET
                    nombre = :nombre,
                    email= :email,
                    fecha_alta = :fecha_alta
                WHERE id = :id";
        $sth = $app['db']->prepare($sql);
        $sth->bindValue(':nombre',$info['nombre']);
        $sth->bindValue(':email',$info['email']);
        $sth->bindValue(':fecha_alta',$info['fecha_alta']);
        $sth->bindValue(':id',intval($info['id']),PDO::PARAM_INT);
        $sth->execute();
    }
    catch(PDOException $e) {
        $response = new Response('', 400);
    }

    return $response;

});

$app->delete('/usuario/{id}', function($id) use ($app) {

    try {
        $sql = "DELETE FROM usuarios
                WHERE id = :id";
        $sth = $app['db']->prepare($sql);
        $sth->bindValue(':id',intval($id),PDO::PARAM_INT);
        $sth->execute();
        $response = new Response('',204);
    }
    catch(PDOException $e) {
        $response = new Response('', 404);
    }

    return $response;

});

$app->post('/usuario', function(Request $request) use ($app) {

    $info = json_decode($request->getContent(),true);

    try {
        $sql = "INSERT INTO usuarios(nombre,email,fecha_alta) VALUES
                (:nombre,:email,:fecha_alta)";
        $sth = $app['db']->prepare($sql);
        $sth->bindValue(':nombre',$info['nombre']);
        $sth->bindValue(':email',$info['email']);
        $sth->bindValue(':fecha_alta',DateTime::createFromFormat('d/m/Y',$info['fecha_alta'])->format('Y-m-d'));
        $sth->execute();

        $sql = "SELECT * FROM usuarios WHERE
                id = :id";
        $sth = $app['db']->prepare($sql);
        $sth->bindValue(':id',intval($app['db']->lastInsertId('id')),PDO::PARAM_INT);
        $sth->execute();

        $results = $sth->fetchAll();
        if(count($results) == 0) $response = new Response('',404);
        else {
            $response = new Response($app['twig']->render('usuarios.json.twig',
                    array(
                        'usuarios' => $results
                    )),
                    201
                );
        }
    }
    catch(PDOException $e) {
        $response = new Response('', 404);
    }

    return $response;

});

$app->after(function() use ($app)
{
    $app['db'] = null;
});

$app->run();
