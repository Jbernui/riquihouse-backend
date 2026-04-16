CREATE DATABASE IF NOT EXISTS riquihouse_db;
USE riquihouse_db;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL, 
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio_venta DECIMAL(10,2) NOT NULL,
    stock_actual INT DEFAULT 0
);

CREATE TABLE insumos (
    id_insumo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    costo_unitario DECIMAL(10,2) NOT NULL,
    stock_actual DECIMAL(10,2) DEFAULT 0.00
);

CREATE TABLE recetas_detalle (
    id_receta INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_insumo INT NOT NULL,
    cantidad_necesaria DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_insumo) REFERENCES insumos(id_insumo)
);

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_venta DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE ventas_detalle (
    id_detalle_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE produccion (
    id_produccion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad_producida INT NOT NULL,
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE mermas (
    id_merma INT AUTO_INCREMENT PRIMARY KEY,
    id_insumo INT NOT NULL,
    cantidad_perdida DECIMAL(10,2) NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_insumo) REFERENCES insumos(id_insumo)
);