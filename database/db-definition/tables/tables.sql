
CREATE TABLE Categorias (
    CategoriaID SERIAL PRIMARY KEY,
    Nombre VARCHAR -- cupcake, cakepop, pastel, galleta, chocolate, espumilla
);


CREATE TABLE Productos (
  ProductoID SERIAL PRIMARY KEY,
  Nombre VARCHAR(255) NOT NULL,
  Descripcion TEXT,
  CategoriaID INT,  
  OcasionID INT,  -- Cumpleaños, San Valentín, Navidad, etc.
  Precio DECIMAL(10, 2) NOT NULL,
  Imagen1 VARCHAR(255) NULL,
  Imagen2 VARCHAR(255) NULL,
  Imagen3 VARCHAR(255) NULL,
  FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID)
);

CREATE TABLE Rellenos (
  RellenoID SERIAL PRIMARY KEY,
  Nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Masas (
  MasaID SERIAL PRIMARY KEY,
  Nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Ocasiones (
  OcasionID SERIAL PRIMARY KEY,
  Nombre VARCHAR(255) NOT NULL,
  FechaInicio DATE,
  FechaFinal DATE
);

CREATE TABLE Coberturas (
  CoberturaID SERIAL PRIMARY KEY,
  Tipo VARCHAR(255) NOT NULL
);

CREATE TABLE Sabores_Galletas (
  Sabor_GalletaID SERIAL PRIMARY KEY,
  Tipo VARCHAR(255) NOT NULL
);

CREATE TABLE Tipo_Chocolate (
  Tipo_ChocolateID SERIAL PRIMARY KEY,
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

CREATE TABLE Direcciones (
  DireccionID SERIAL PRIMARY KEY,
  Nombre BYTEA NOT NULL,
  Campo1 BYTEA NOT NULL,
  Campo2 BYTEA,
  Ciudad BYTEA NOT NULL,
  Departamento BYTEA NOT NULL,
  Detalles BYTEA
);

CREATE TABLE Usuarios (
  UsuarioID SERIAL PRIMARY KEY,
  Rol TEXT NOT NULL,
  Usuario BYTEA NOT NULL,
  Primer_Nombre BYTEA NULL,
  Segundo_Nombre BYTEA NULL,
  Correo BYTEA NULL,
  Telefono BYTEA NULL,
  Password TEXT NOT NULL,
  Direccion1ID INT,
  Direccion2ID INT,
  Direccion3ID INT,
  Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_email UNIQUE (Correo),
  CONSTRAINT unique_usuario UNIQUE (Usuario),

  CONSTRAINT fk_direccion1 FOREIGN KEY (Direccion1ID) REFERENCES Direcciones(DireccionID) ON DELETE SET NULL,
  CONSTRAINT fk_direccion2 FOREIGN KEY (Direccion2ID) REFERENCES Direcciones(DireccionID) ON DELETE SET NULL,
  CONSTRAINT fk_direccion3 FOREIGN KEY (Direccion3ID) REFERENCES Direcciones(DireccionID) ON DELETE SET NULL
);


CREATE TABLE Carritos (
  CarritoID SERIAL PRIMARY KEY,
  UsuarioID INT,
  Total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

CREATE TABLE Personalizaciones (
  PersonalizacionID SERIAL PRIMARY KEY,
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
  PedidoID SERIAL PRIMARY KEY,
  CarritoID INT,
  Metodo_Pago VARCHAR(255) NOT NULL,
  Pago_Anticipado BOOLEAN NOT NULL,
  Pago_Completo BOOLEAN NOT NULL,
  Estado_Orden VARCHAR(255) NOT NULL,  -- en curso, finalizado
  Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (CarritoID) REFERENCES Carritos(CarritoID)
);
