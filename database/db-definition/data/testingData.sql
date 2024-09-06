INSERT INTO coberturas(tipo) VALUES('Fondant'),('Fruta'),('Crema de mantequilla'), ('Turron'), ('Cream cheese');

INSERT INTO masas(Nombre) VALUES('Chocolate'),('Vainilla'),('Amapola'), ('Veteado'),('Red velvet'), ('Zanahoria'),('Arandanos');

INSERT INTO Rellenos(nombre) VALUES('Cajeta'),('Nutella'),('Jalea de fresa'), ('Jalea de mora'),('Cream cheese');

INSERT INTO Tipo_Chocolate(tipo) VALUES('Leche'),('Blanco'), ('Oscuro');

INSERT INTO Sabores_Galletas(tipo) VALUES('Mantequilla'),('Jengibre'),('Chocolate'), ('Arandanos'), ('Matcha'), ('Pecanas');

INSERT INTO Categorias(nombre) VALUES('cupcake'), ('cakepop'), ('pastel'), ('galleta'), ('chocolate'), ('espumilla');

INSERT INTO Ocasiones (Nombre, FechaInicio, FechaFinal) VALUES
('Indefinida', NULL, NULL),
('Verano', '2024-06-21', '2024-09-23'),
('Otoño', '2024-09-24', '2024-12-20'),
('Invierno', '2024-12-21', '2024-03-20'),
('Primavera', '2024-03-21', '2024-09-23'),
('Día del Niño', '2024-09-24', '2024-06-20'),
('Cumpleaños', NULL, NULL),
('Navidad', '2024-12-01', '2024-12-25'),
('San Valentín', '2024-02-01', '2024-02-14'),
('Aniversario', '2024-01-01', '2024-01-01'),
('Año nuevo', '2024-01-25', '2024-01-31'),
('Halloween', '2024-10-01', '2024-10-25'),
('15 años', '2024-01-01', '2025-01-01'),
('Boda', '2024-01-01', '2025-01-01'),
('Bautizo', '2024-01-01', '2025-01-01'),
('Primera comunion', '2024-01-01', '2025-01-01'),
('Confirmacion', '2024-01-01', '2025-01-01'),
('Dia de la madre', '2024-04-01', '2024-05-05'),
('Dia del padre', '2024-05-10', '2024-06-12'),
('Dia de los abuelitos', '2024-06-26', '2024-07-21');

INSERT INTO Productos(nombre, Descripcion, CategoriaID, OcasionID, Precio, Imagen1) VALUES
('Pastel del día del Niño', 'Celebra el Día del Niño con un toque especial con nuestro Pastel del Día del Niño. Este encantador pastel de vainilla está cubierto con fondant y relleno de deliciosa cajeta, creando una combinación de sabores que hará las delicias de los más pequeños. Decorado con el divertido y adorable Monstruo Come Galletas, este pastel es perfecto para agregar un toque de alegría y personalización a cualquier fiesta infantil. Un deleite tanto para la vista como para el paladar.',
3, 6, '35', '/Cumpleaños.jpg' ),
('Paquete de 6 Cakepops con Anicillos', '¡Deléitate con nuestro delicioso Paquete de 6 Cakepops con Anicillos! Perfectos para cualquier ocasión, estos cakepops están hechos con una masa de chocolate exquisito y cubiertos con un suave chocolate con leche. Cada bocado es una explosión de sabor que te encantará. Ideales para compartir o disfrutar solo, estos cakepops son una opción deliciosa y divertida.',
2, 1, '60','/Cumpleaños.jpg'),
('Paquete de 5 Galletas Navideñas 🎅', 'Celebra la magia de la Navidad con nuestro Paquete de 5 Galletas Navideñas 🎅. Estas galletas de jengibre son perfectas para la temporada festiva, con un sabor clásico que evoca todos los encantos de la Navidad. Su textura suave y su aroma especiado te harán sentir el espíritu navideño en cada mordida. Un regalo perfecto o un capricho para disfrutar en casa.',
4, 8, '25','/Cumpleaños.jpg'),
('Pastel de cumpleaños', 'Celebra tu cumpleaños con nuestro delicioso pastel. Este pastel agregara un toque dulce a tu celebración, además de darle un gran toque de decoracion a la mesa de comida. Su bizcocho esponjoso de chocolate, con relleno de jalea de fresas y decorado especialmente para tu evento hace que se convienta en un pastel especial.',
3, 7, '350','/Cumpleaños.jpg'),
('Galletas cumpleaños', 'Nuestras deliciosas galletas de mantequilla decoradas con icing para tu ocación especial. Personaliza tus galletas para tener una decoración unica y difente en tu dia tan especial.',
4, 7, '100','/GalletasC.jpg'),
('Bolsa de espimillas', 'Nuestras deliciosas espumillas que llenan tus tardes de toques dulces tan especiales.',
6, 1, '30','/Espumillas.jpg'),
('Cupcakes para aniversario', 'Nuestro delicioso paquete de 6 cupcakes para celebrar tu fecha especial y compartir con tu persona favorita.',
1, 10, '30','/Cupcake.jpg'),
('Pastel primera comunión', 'Un delicioso pastel de amapola, relleno de dulce de leche. Perfecto para celebrar una ocasión especial.',
3, 16, '300','/PC.jpg'),
('Pastel para Boda', 'Nuestro exquisito pastel para bodas, decorado con fondant y detalles personalizados, hará que tu día especial sea aún más memorable. Su suave masa de vainilla y relleno de nutella crean una combinación perfecta.', 
3, 14, '500', '/Boda.jpg'),
('Caja de 12 Cupcakes San Valentín', 'Disfruta del amor con nuestra caja de 12 cupcakes decorados especialmente para San Valentín. Estos cupcakes de red velvet decorados con cream cheese son el regalo perfecto para tu ser querido.', 
1, 9, '150', '/Cariño.jpg'),
('Galletas para Halloween', 'Celebra Halloween con nuestras divertidas galletas decoradas con icing temático. Sabor de mantequilla, perfectas para compartir en tu fiesta.', 
4, 12, '80', '/HW.jpg'),
('Chocolate de Otoño', 'Disfruta de la temporada de otoño con nuestro delicioso chocolate oscuro, ideal para las tardes frescas. Un sabor profundo que te hará sentir el abrazo de esta estación.', 
5, 3, '50', '/CO.jpg'),
('Cakepops para Año Nuevo', 'Comienza el año nuevo con estos deliciosos cakepops de vainilla cubiertos de chocolate blanco. Perfectos para cualquier celebración, estos cakepops son una delicia para todos.', 
2, 11, '70', '/AN.jpg'),
('Pastel de Zanahoria para Primavera', 'Un delicioso pastel de zanahoria con cobertura de queso crema, decorado con motivos primaverales. Ideal para celebrar la llegada de la nueva estación.', 
3, 5, '200', '/ZP.jpg'),
('Galletas del Día del Padre', 'Sorprende a papá con nuestras galletas de jengibre decoradas especialmente para el Día del Padre. Un regalo delicioso y lleno de amor.', 
4, 19, '90', '/JP.jpg'),
('Paquete de 6 Cupcakes de Navidad', 'Nuestros cupcakes de chocolate decorados con motivos navideños son el complemento perfecto para tus festividades. Cada cupcake es una explosión de sabor que te encantará.', 
1, 8, '100', '/CN.jpg'),
('Pastel para Confirmación', 'Un pastel especial para la confirmación, decorado con detalles religiosos y personalizado según tus preferencias. Su suave masa de chocolate y relleno de jalea de mora lo hacen irresistible.', 
3, 17, '350', '/Confirmacion.jpg'),
('Galletas Día de la Madre', 'Nuestras galletas de pecanas especiales para el Día de la Madre son el regalo perfecto para expresar tu amor y gratitud.', 
4, 18, '120', '/Boda.jpeg'),
('Pastel para 15 Años', 'Celebra tus 15 años con un pastel único, decorado con detalles personalizados y un toque de elegancia. Masa de veteado con relleno de cajeta para un sabor inolvidable.', 
3, 13, '450', '/15.jpg'),
('Paquete de Espumillas Otoñales', 'Disfruta del otoño con nuestras espumillas de sabores cálidos, perfectas para acompañar tus tardes en esta temporada.', 
6, 3, '30', '/EO.jpg');

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