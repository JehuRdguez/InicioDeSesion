<?php
session_start();

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "algoritmoshash";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    if (isset($_POST['nombre'])) {
        $nombre = $_POST['nombre'];

        $correosExistentes = "SELECT * FROM usuarios WHERE correo = '$correo'";
        $existencia = $conn->query($correosExistentes);

        if ($existencia->num_rows > 0) {
            $response['success'] = false;
            $response['message'] = 'El correo ya está registrado';
        } else {
            $contrasena = md5($contrasena);

            $insertUser = "INSERT INTO usuarios (correo, contrasena, nombre) VALUES ('$correo', '$contrasena', '$nombre')";
            if ($conn->query($insertUser) === TRUE) {
                $response['success'] = true;
                $_SESSION['usuario'] = $nombre;
                $response['message'] = 'Registro exitoso';
            } else {
                $response['success'] = false;
                $response['message'] = 'Error en el registro: ' . $conn->error;
            }
        }
    } else {
        $contrasena = md5($contrasena);

        $sql = "SELECT * FROM usuarios WHERE correo = '$correo'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            if ($row['contrasena'] == $contrasena) {
                $response['success'] = true;
                $_SESSION['usuario'] = $row['nombre'];
            } else {
                $response['success'] = false;
                // $response['message'] = 'Contraseña incorrecta';
            }
        } else {
            $response['success'] = false;
            // $response['message'] = 'Correo inexistente';
        }
    }
} else {
    $response['success'] = false;
}

echo json_encode($response);

$conn->close();
?>
