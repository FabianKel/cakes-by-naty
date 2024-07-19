INSERT INTO coberturas VALUES(1, 'Fondant'),(2, 'Fruta');

INSERT INTO masas VALUES(1, 'Chocolate'),(2, 'Vainilla');

INSERT INTO Rellenos VALUES(1, 'Cajeta'),(2, 'Nutella');

INSERT INTO Tipo_Chocolate VALUES(1, 'Leche'),(2, 'Blanco'), (3, 'Oscuro');

INSERT INTO Sabores_Galletas VALUES(1, 'Mantequilla'),(2, 'Jengibre');

INSERT INTO Categorias VALUES(1, 'cupcake'), (2, 'cakepop'), (3, 'pastel'), (4, 'galleta'), (5, 'chocolate'), (6, 'espumilla');

INSERT INTO Productos VALUES
(1, 'Pastel del día del Niño', 3, 'Dia del Niño', '35', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMWE2PHElNz94NDwzwIywmsDbv2_VKp82xA&s' ),
(2, 'Paquete de 6 Cakepops con Anicillos', 2, 'Otro', '60','https://www.livewellbakeoften.com/wp-content/uploads/2021/09/Homemade-Chocolate-Cake-Pops-13.jpg'),
(3, 'Paquete de 5 Galletas Navideñas 🎅', 4, 'Navidad', '25','https://cdn7.kiwilimon.com/recetaimagen/90/640x640/27962.jpg.webp');

INSERT INTO Detalles_Producto VALUES
(1, 1, 2, null, 1, null),
(2, null, 1, null, null, 1),
(3, null, null, 2, null, null);

--USUARIOS Y PEDIDOS

INSERT INTO Usuarios(UsuarioID, Nombre_Usuario, Correo, Telefono, Contraseña, Direccion1) VALUES
(1, 'Aleee26', 'aleee26@gmail.com', 26022004, 'miab2024', '3ra calle, sector 11, casa 24-36, Condominio los Faroles, San Lucas Sacatepeques, Sacatepequez'),
(2, 'FabianKel', 'fabiankel@gmail.com', 1103004, 'pasteles123', '6ta calle, casa 3-14, Plaza Sésamo, Villa Nueva, Guatemala'),
(3, 'Gio', 'gio1998@gmail.com', 42004200, 'qwerty', 'sector 2, casa 36, Villas de Miraflores, Zona 11 Guatemala');

INSERT INTO Carritos(CarritoID, UsuarioID, Total) VALUES
(1, 1, 50), (2, 2, 95), (3, 3, 0);

INSERT INTO Carrito_Producto VALUES
(1, 3, null, 2),
(2, 1, null, 1),
(2, 2, null, 1);

INSERT INTO Pedidos(PedidoID, CarritoID, Metodo_Pago, Pago_Anticipado, Pago_Completo, Estado_Orden) VALUES
(1, 1, 'efectivo', false, false, 'Sin Entregar'),
(2, 2, 'transferencia', true, true, 'Entregado');