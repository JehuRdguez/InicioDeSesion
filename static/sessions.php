<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: ../index.html");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['cerrarSesion'])) {
    session_unset();
    session_destroy();
    header("Location: ../index.html");
    exit();
}
?>