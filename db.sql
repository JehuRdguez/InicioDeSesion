CREATE DATABASE IF NOT EXISTS algoritmoshash;

USE algoritmoshash;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL
);