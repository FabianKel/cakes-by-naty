INSERT INTO coberturas(tipo) VALUES('Fondant'),('Fruta');

INSERT INTO masas(Nombre) VALUES('Chocolate'),('Vainilla');

INSERT INTO Rellenos(nombre) VALUES('Cajeta'),('Nutella');

INSERT INTO Tipo_Chocolate(tipo) VALUES('Leche'),('Blanco'), ('Oscuro');

INSERT INTO Sabores_Galletas(tipo) VALUES('Mantequilla'),('Jengibre');

INSERT INTO Categorias(nombre) VALUES('cupcake'), ('cakepop'), ('pastel'), ('galleta'), ('chocolate'), ('espumilla');

INSERT INTO Ocasiones (Nombre, FechaInicio, FechaFinal) VALUES
('Indefinida', NULL, NULL),
('Verano', '2024-06-21', '2024-09-23'),
('Otoño', '2024-09-24', '2024-12-20'),
('Invierno', '2024-12-21', '2024-03-20'),
('Primavera', '2024-03-21', '2024-09-23'),
('Día del Niño', '2024-09-24', '2024-06-20'),
('Cumpleaños', NULL, NULL),
('Navidad', '2024-12-15', '2024-12-25'),
('San Valentín', '2024-02-01', '2024-02-14'),
('Aniversario', '2024-01-01', '2024-01-01');

INSERT INTO Productos(nombre, Descripcion, CategoriaID, OcasionID, Precio, Imagen1) VALUES
('Pastel del día del Niño', 'Celebra el Día del Niño con un toque especial con nuestro Pastel del Día del Niño. Este encantador pastel de vainilla está cubierto con fondant y relleno de deliciosa cajeta, creando una combinación de sabores que hará las delicias de los más pequeños. Decorado con el divertido y adorable Monstruo Come Galletas, este pastel es perfecto para agregar un toque de alegría y personalización a cualquier fiesta infantil. Un deleite tanto para la vista como para el paladar.',
3, 6, '35', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMWE2PHElNz94NDwzwIywmsDbv2_VKp82xA&s' ),
('Paquete de 6 Cakepops con Anicillos', '¡Deléitate con nuestro delicioso Paquete de 6 Cakepops con Anicillos! Perfectos para cualquier ocasión, estos cakepops están hechos con una masa de chocolate exquisito y cubiertos con un suave chocolate con leche. Cada bocado es una explosión de sabor que te encantará. Ideales para compartir o disfrutar solo, estos cakepops son una opción deliciosa y divertida.',
2, 1, '60','https://www.livewellbakeoften.com/wp-content/uploads/2021/09/Homemade-Chocolate-Cake-Pops-13.jpg'),
('Paquete de 5 Galletas Navideñas 🎅', 'Celebra la magia de la Navidad con nuestro Paquete de 5 Galletas Navideñas 🎅. Estas galletas de jengibre son perfectas para la temporada festiva, con un sabor clásico que evoca todos los encantos de la Navidad. Su textura suave y su aroma especiado te harán sentir el espíritu navideño en cada mordida. Un regalo perfecto o un capricho para disfrutar en casa.',
4, 8, '25','https://cdn7.kiwilimon.com/recetaimagen/90/640x640/27962.jpg.webp');

INSERT INTO Detalles_Producto(ProductoID, RellenoID, MasaID, Sabor_GalletaID, CoberturaID, Tipo_ChocolateID) VALUES
(1, 1, 2, null, 1, null),
(2, null, 1, null, null, 1),
(3, null, null, 2, null, null);

--USUARIOS Y PEDIDOS
INSERT INTO Direcciones (Nombre, Campo1, Campo2, Ciudad, Departamento, Detalles)
VALUES 
('Casa Principal', '6ta calle, casa 3-14', 'Plaza Sésamo, Zona 1', 'Guatemala', 'Guatemala', 'Casa de dos pisos, portón verde.'),
('Oficina', 'Av. Reforma, Edificio Torre Viva', 'Nivel 10, Oficina 101', 'Guatemala', 'Guatemala', 'Oficina corporativa, solicitar acceso en recepción.'),
('Apartamento', '12 Calle, Edificio Central Park', 'Apto. 5B, Zona 10', 'Guatemala', 'Guatemala', 'Apartamento con vista al parque, timbre en la entrada principal.');

INSERT INTO Usuarios (Rol, Usuario, Primer_Nombre, Segundo_Nombre, Correo, Telefono, Password, Direccion1ID, Direccion2ID, Direccion3ID) VALUES
('cliente', 'user123', 'Carlos', 'Lopez', 'carlos.lopez@gmail.com', '+50212345678', 'password123', 1, 2, NULL),
('cliente', 'mariaq', 'Maria', 'Quintero', 'maria.q@hotmail.com', '+50287654321', 'mypass789', 3, NULL, NULL),
('administrador', 'admin01', 'Laura', 'Martinez', 'laura.martinez@empresa.com', '+50255553333', 'adminpassword', NULL, NULL, NULL);




INSERT INTO Carritos(UsuarioID, Total) VALUES
(1, 50), (2, 95), (3, 0);

INSERT INTO Carrito_Producto VALUES
(1, 3, null, 2),
(2, 1, null, 1),
(2, 2, null, 1);

INSERT INTO Pedidos(CarritoID, Metodo_Pago, Pago_Anticipado, Pago_Completo, Estado_Orden) VALUES
(1, 'efectivo', false, false, 'Sin-Entregar'),
(2, 'efectivo', true, true, 'Entregado'),
(1, 'efectivo', false, false, 'Sin-Entregar'),
(2, 'transferencia', true, false, 'Sin-Entregar'),
(3, 'transferencia', true, false, 'Sin-Entregar'),
(2, 'transferencia', true, true, 'Entregado'),
(3, 'efectivo', false, false, 'Sin-Entregar'),
(2, 'transferencia', true, true, 'Entregado');