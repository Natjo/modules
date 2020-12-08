
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8" />
    <title>Views</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="assets/favicon/site.webmanifest">
    <link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    <link href="assets/styles/print.css" rel="stylesheet" type="text/css" media="print">

    <link href="assets/styles/reset.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/styles/fonts.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/styles/icomoon.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/styles/variables.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/styles/styles.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/styles/form.css" rel="stylesheet" type="text/css" media="screen">

    <link href="assets/styles/app.css" rel="stylesheet" type="text/css" media="screen">

</head>

<?php
global $navigation;
$navigation = array(
    array(
        "name" => "Home",
        "href" => "/"
    ),
    array(
        "name" => "Contact",
        "href" => "/contact"
    ),
    array(
        "name" => "Articles",
        "href" => "/archive"
    ),
);
?>

<?php include("common/views.php"); ?>

<body>