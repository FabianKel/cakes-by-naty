const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendEmail = async (req, res) => {
    const { titulo, cuerpo, productos, total, usuario_nombre, usuario_apellido, usuario_correo, usuario_telefono, direccion } = req.body;

    if (!titulo || !cuerpo || !productos || !total || !usuario_nombre || !usuario_apellido || !usuario_correo || !usuario_telefono || !direccion) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
    try {
        console.log(process.env.EMAIL_USER)
        console.log(process.env.EMAIL_PASS)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            debug: true,
            logger: true,
        });
        
        transporter.verify((error, success) => {
            if (error) {
                console.error('Error en la configuración del transporte:', error);
            } else {
                console.log('Servidor listo para enviar correos');
            }
        });

        // Crear tabla HTML para productos
        const productosHtml = productos.map(
            (producto) => `
            <tr>
                <td>${producto.nombre_producto}</td>
                <td>${producto.descripcion_producto}</td>
                <td>${producto.cantidad}</td>
                <td>Q${producto.precio}</td>
                <td>Q${producto.total}</td>
            </tr>
            `
        ).join('');

        // Contenido del correo
        const emailHtml = `
            <h1>${titulo}</h1>
            <p>${cuerpo}</p>
            <h2>Información del usuario</h2>
            <p><strong>Nombre:</strong> ${usuario_nombre} ${usuario_apellido}</p>
            <p><strong>Correo:</strong> ${usuario_correo}</p>
            <p><strong>Teléfono:</strong> ${usuario_telefono}</p>
            <p><strong>Dirección:</strong> ${direccion.nombre}, ${direccion.campo1}, ${direccion.campo2}, ${direccion.ciudad}, ${direccion.departamento}</p>
            <h2>Productos</h2>
            <table border="1" cellspacing="0" cellpadding="5">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${productosHtml}
                </tbody>
            </table>
            <h2>Total: Q${total}</h2>
        `;

        // Configurar opciones del correo
        const mailOptions = {
            from: process.env.EMAIL_USER, // Remitente
            to: process.env.EMAIL_USER, // Destinatario
            subject: 'Nuevo Pedido realizado',
            html: emailHtml,
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo', error });
    }
};

module.exports = { sendEmail };