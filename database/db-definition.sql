-------------------------------------------------------------------------------
--------------------------- DATABASE CONFIGURATIONS ---------------------------
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
---------------------------     TABLES CREATION     ---------------------------
-------------------------------------------------------------------------------

CREATE TABLE Categorias (
    CategoriaID INT PRIMARY KEY,
    Nombre VARCHAR -- cupcake, cakepop, pastel, galleta, chocolate, espumilla
);

CREATE TABLE Productos (
  ProductoID INT PRIMARY KEY,
  Nombre VARCHAR(255) NOT NULL,
  CategoriaID INT,  
  Ocasion VARCHAR(255),  -- Cumpleaños, San Valentín, Navidad, etc.
  Precio DECIMAL(10, 2) NOT NULL,
  Imagen1 VARCHAR(255) NULL,
  Imagen2 VARCHAR(255) NULL,
  Imagen3 VARCHAR(255) NULL,
  FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID)
);

CREATE TABLE Rellenos (
  RellenoID INT PRIMARY KEY,
  Nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Masas (
  MasaID INT PRIMARY KEY,
  Nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Coberturas (
  CoberturaID INT PRIMARY KEY,
  Tipo VARCHAR(255) NOT NULL
);

CREATE TABLE Sabores_Galletas (
  Sabor_GalletaID INT PRIMARY KEY,
  Tipo VARCHAR(255) NOT NULL
);

CREATE TABLE Tipo_Chocolate (
  Tipo_ChocolateID INT PRIMARY KEY,
  Tipo VARCHAR(255) NOT NULL  -- blanco, oscuro, leche
);


CREATE TABLE Detalles_Producto (
  ProductoID INT,
  RellenoID INT NULL,
  MasaID INT NULL,
  Sabor_GalletaID INT NULL,
  CoberturaID INT NULL,
  Tipo_ChocolateID INT NULL,
  FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID),
  FOREIGN KEY (RellenoID) REFERENCES Rellenos(RellenoID),
  FOREIGN KEY (MasaID) REFERENCES Masas(MasaID),
  FOREIGN KEY (Sabor_GalletaID) REFERENCES Sabores_Galletas(Sabor_GalletaID),
  FOREIGN KEY (CoberturaID) REFERENCES Coberturas(CoberturaID)
);

CREATE TABLE Usuarios (
  UsuarioID INT PRIMARY KEY,
  Nombre_Usuario VARCHAR(255) NOT NULL,
  Correo VARCHAR(255) NOT NULL,
  Telefono VARCHAR(20),
  Contraseña VARCHAR(255) NOT NULL,
  Direccion1 VARCHAR(255) NULL,
  Direccion2 VARCHAR(255) NULL,
  Direccion3 VARCHAR(255) NULL,
  Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Carritos (
  CarritoID INT PRIMARY KEY,
  UsuarioID INT,
  Total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

CREATE TABLE Personalizaciones (
  PersonalizacionID INT PRIMARY KEY,
  CategoriaID int NOT NULL,
  RellenoID INT NULL,
  MasaID INT NULL,
  Sabor_GalletaID INT NULL,
  CoberturaID INT NULL,
  Tipo_Chocolate VARCHAR(255) NULL,  -- blanco, oscuro, leche
  Comentario VARCHAR(255) NULL,
  Imagen1 VARCHAR(255) NULL,
  Imagen2 VARCHAR(255) NULL,
  Imagen3 VARCHAR(255) NULL,
  FOREIGN KEY (RellenoID) REFERENCES Rellenos(RellenoID),
  FOREIGN KEY (MasaID) REFERENCES Masas(MasaID),
  FOREIGN KEY (Sabor_GalletaID) REFERENCES Sabores_Galletas(Sabor_GalletaID),
  FOREIGN KEY (CoberturaID) REFERENCES Coberturas(CoberturaID)
);

CREATE TABLE Carrito_Producto (
  CarritoID INT,
  ProductoID INT NULL,
  PersonalizacionID INT NULL,
  Cantidad INT NOT NULL,
  FOREIGN KEY (CarritoID) REFERENCES Carritos(CarritoID),
  FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID),
  FOREIGN KEY (PersonalizacionID) REFERENCES Personalizaciones(PersonalizacionID)
);

CREATE TABLE Pedidos (
  PedidoID INT PRIMARY KEY,
  CarritoID INT,
  Metodo_Pago VARCHAR(255) NOT NULL,
  Pago_Anticipado BOOLEAN NOT NULL,
  Pago_Completo BOOLEAN NOT NULL,
  Estado_Orden VARCHAR(255) NOT NULL,  -- en curso, finalizado
  FOREIGN KEY (CarritoID) REFERENCES Carritos(CarritoID)
);



-- BLOGS TABLE
-- \i ../database/db-definition/tables/users.sql


-------------------------------------------------------------------------------
---------------------------------- PRINT END ----------------------------------
-------------------------------------------------------------------------------

\! echo "ALL SCRIPTS RAN CORRECTLY"