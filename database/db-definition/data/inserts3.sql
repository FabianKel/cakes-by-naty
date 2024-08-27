
INSERT INTO Detalles_Producto(ProductoID, RellenoID, MasaID, Sabor_GalletaID, CoberturaID, Tipo_ChocolateID) VALUES
(1, 1, 2, null, 1, null),
(2, null, 1, null, null, 1),
(3, null, null, 2, null, null),
(4, 3, 1, null, 3, null),
(5, null, null, 1, null, null),
(6, null, null, null, null, null),
(7, null, 3, null, 3, null),
(8, 1, 2, null, 3, null),
(9, 2, 2, null, 1, null), 
(10, null, 5, null, 5, null), 
(11, null, null, 1, null, null), 
(12, null, null, null, null, 3), 
(13, null, 2, null, null, 2), 
(14, null, 6, null, 5, null), 
(15, null, null, 2, null, null), 
(16, null, 1, null, 1, null), 
(17, 4, 1, null, 3, null), 
(18, null, null, 6, null, null), 
(19, 1, 4, null, 1, null), 
(20, null, null, null, null, null);

--USUARIOS Y PEDIDOS
INSERT INTO Direcciones (Nombre, Campo1, Campo2, Ciudad, Departamento, Detalles)
VALUES 
('Casa Principal', '6ta calle, casa 3-14', 'Plaza Sésamo, Zona 1', 'Guatemala', 'Guatemala', 'Casa de dos pisos, portón verde.'),
('Oficina', 'Av. Reforma, Edificio Torre Viva', 'Nivel 10, Oficina 101', 'Guatemala', 'Guatemala', 'Oficina corporativa, solicitar acceso en recepción.'),
('Apartamento', '12 Calle, Edificio Central Park', 'Apto. 5B, Zona 10', 'Guatemala', 'Guatemala', 'Apartamento con vista al parque, timbre en la entrada principal.');

INSERT INTO Usuarios(Rol, usuario, Primer_Nombre, Segundo_Nombre, correo, telefono, Password, Direccion1ID) VALUES
('cliente', 'Aleee26', 'Mónica', 'Salvatierra', 'aleee26@gmail.com', +50212345678, 'miab2024', 1 ),
('cliente', 'Fabiankel', 'Fabian','Kelson', 'fabiankel@gmail.com', +50212345678, 'pasteles123', 2),
('cliente', 'Gio', 'Giovanni','Santos', 'gio1998@gmail.com', +50212345678, 'qwerty', 3),
('cliente', 'Carlos82', 'Carlos', 'Hernandez', 'carlos82@gmail.com', +50212345678,'olaola', 1),
('cliente', 'Lety89', 'Leticia', 'Morales', 'lety89@gmail.com', +50212345678, 'olademar', 2),
('cliente', 'Luis24', 'Luis', 'Gonzalez', 'luis24@gmail.com', +50212345678, 'abc1234', 3),
('cliente', 'Anita01', 'Ana', 'Lopez', 'anita01@gmail.com', +50212345678, 'miPassword', 1),
('cliente', 'Pablo1990', 'Pablo', 'Torres', 'pablo1990@gmail.com', +50212345678, '123qweasd',2),
('cliente', 'Meli21', 'Melisa', 'Martinez', 'meli21@gmail.com', +50212345678, 'melimeli', 3),
('cliente', 'Javi76', 'Javier', 'Vargas', 'javi76@gmail.com', +50212345678, 'qazwsx', 1),
('cliente', 'Ceci55', 'Cecilia', 'Perez', 'ceci55@gmail.com', +5022233445, 'cecilia55', 3),
('cliente', 'Rafa44', 'Rafael', 'Ortega', 'rafa44@gmail.com', +5021122334, 'rafa1234', 2),
('cliente', 'Vero13', 'Veronica', 'Jimenez', 'vero13@gmail.com', +5025566778, 'vero2024', 3),
('cliente', 'Mau18', 'Mauricio', 'Ruiz', 'mau18@gmail.com', +5023344556, 'mauMau18', 1),
('cliente', 'Sofi33', 'Sofia', 'Mendez', 'sofi33@gmail.com', +5029988776, 'sofia33',2 ),
('cliente', 'JoseLuis', 'Jose', 'Luis', 'joseluis@gmail.com', +5026677889, 'jose1234', 3),
('cliente', 'Ale99', 'Alejandro', 'Castillo', 'ale99@gmail.com', +5021231234, 'ale99ale', 2),
('cliente', 'Vane07', 'Vanessa', 'Garcia', 'vane07@gmail.com', +5027788990, 'vane123', 1),
('cliente', 'Gaby05', 'Gabriela', 'Ramos', 'gaby05@gmail.com', +5029988007, 'gabyRamos', 2),
('cliente', 'Fer23', 'Fernando', 'Estrada', 'fer23@gmail.com', +5024455667, 'fer1234', 1),
('cliente', 'Lili84', 'Liliana', 'Bautista', 'lili84@gmail.com', +5021122004, 'lili84', 1),
('cliente', 'Marce12', 'Marcela', 'Diaz', 'marce12@gmail.com', +5023344789, 'marce2024', 2),
('cliente', 'Tony40', 'Antonio', 'Santos', 'tony40@gmail.com', +5025566778, 'tonyTony40', 2),
('admin', 'Admin', NULL, NULL, NULL, NULL, '$2a$06$YIIBGTw7b9bfowp5b.0EOed/3PFlfDaQeMdOeEf5cXHpiVnfGqWJ6', NULL);


INSERT INTO Carritos(UsuarioID, Total) VALUES
(1, 50), (2, 95), (3, 350), (4, 100), (5, 30), (6, 500), (7, 95), (8, 350), (9, 100), (10, 60),
(11, 90), (12, 65), (13, 250), (14, 400), (15, 30), (16, 80), (17, 95), (18, 350), (19, 400), (20, 550);

INSERT INTO Carrito_Producto VALUES
(1, 3, null, 2),
(2, 1, null, 1),
(2, 2, null, 1),
(3, 4, NULL, 1),
(1, 5, NULL, 3),
(2, 6, NULL, 2),
(3, 7, NULL, 1),
(3, 15, NULL, 3),
(2, 16, NULL, 2),
(1, 17, NULL, 1),
(3, 18, NULL, 4),
(2, 19, NULL, 3),
(1, 20, NULL, 2),
(1, 8, NULL, 4),
(3, 9, NULL, 2),
(2, 10, NULL, 3),
(1, 11, NULL, 2),
(3, 12, NULL, 1),
(2, 13, NULL, 2),
(1, 14, NULL, 1);

INSERT INTO Pedidos(CarritoID, Metodo_Pago, Pago_Anticipado, Pago_Completo, Estado_Orden) VALUES
(1, 'efectivo', false, false, 'Sin-Entregar'),
(2, 'efectivo', true, true, 'Entregado'),
(1, 'efectivo', false, false, 'Sin-Entregar'),
(2, 'transferencia', true, false, 'Sin-Entregar'),
(3, 'transferencia', true, false, 'Sin-Entregar'),
(2, 'transferencia', true, true, 'Entregado'),
(3, 'efectivo', false, false, 'Sin-Entregar'),
(2, 'transferencia', true, true, 'Entregado'),
(1, 'efectivo', false, false, 'Sin-Entregar'),
(3, 'tarjeta', true, true, 'Entregado'),
(2, 'tarjeta', false, false, 'Sin-Entregar'),
(1, 'efectivo', true, false, 'Sin-Entregar'),
(3, 'efectivo', true, true, 'Entregado'),
(2, 'transferencia', false, false, 'Sin-Entregar'),
(1, 'tarjeta', true, true, 'Entregado'),
(3, 'tarjeta', false, false, 'Sin-Entregar'),
(2, 'efectivo', true, true, 'Entregado'),
(1, 'transferencia', false, false, 'Sin-Entregar'),
(3, 'tarjeta', true, true, 'Entregado'),
(2, 'tarjeta', false, false, 'Sin-Entregar');
