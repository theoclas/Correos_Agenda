async function Correo(Fecha, Hora, Paciente, Profecional, mail, TipoCorreo) {
    const nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // hostname
        secureConnection: false,
        port: 465,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'miscitasclini@gmail.com',
            pass: 'vtxoyxhapqxryzmo'
        }
    });
    
    Titulo = {
        1: 'Recordatorio de Cita Odontológica',
        2: 'Recordatorio de Cita Odontológica',
        3: 'Cancelación de Cita Odontológica'
    }
    Colores = {
        1: '#3a78c3',
        2: '#ff8f00',
        3: '#e57373'
    }
    Texto = {
        1: 'Te recordamos que tienes una cita programada con nosotros:',
        2: 'Se realizó una modificación a tu cita programada, Recuerda Validar Fecha, Hora, y Profesional:',
        3: 'Te informamos que tu Cita Odontológica ha sido cancelada:'
    }
    TextoFin = {
        1: 'Por favor, llega 10 minutos antes de tu cita. Si necesitas cancelar o reprogramar, contáctanos con antelación.',
        2: 'Por favor, llega 10 minutos antes de tu cita. Si necesitas cancelar o reprogramar, contáctanos con antelación.',
        3: 'Si necesitas programar una nueva cita, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.'
    }


//     var ContenidoHTMLDelCorreo = `
//     <!DOCTYPE html>
// <html>
// <head>
//    <meta charset="UTF-8">
//    <meta name="viewport" content="width=device-width, initial-scale=1.0">
//    <style>
//        body {
//            font-family: Arial, sans-serif;
//            background-color: #f7faff;
//            margin: 0;
//            padding: 0;
//        }
//        .container {
//            max-width: 400px;
//            margin: 20px auto;
//            background-color: #ffffff;
//            border: 1px solid #d1e0f2;
//            border-radius: 8px;
//            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//            overflow: hidden;
//            position: relative;
//            background-image: url('https://www.clinicacolombianadeimplantes.com/images/logoblanco-2025.png'); /* Ruta de la imagen */
//            background-size: 80%; /* Ajusta el tamaño */
//            background-repeat: no-repeat;
//            background-position: center;
//            opacity: 1; /* La opacidad del contenedor completo */
//        }
//        .container::before {
//            content: '';
//            background-image: url('https://www.clinicacolombianadeimplantes.com/images/logoblanco-2025.png');
//            background-size: 80%; /* Ajusta el tamaño del logo */
//            background-repeat: no-repeat;
//            background-position: center;
//            opacity: 80; /* Opacidad para marca de agua */
//            position: absolute;
//            top: 0;
//            left: 0;
//            width: 100%;
//            height: 100%;
//            z-index: 0; /* Detrás del contenido */
//        }
//        .header, .body, .footer {
//            position: relative;
//            z-index: 1; /* Asegura que el texto esté por encima del fondo */
//        }
//        .header {
//            background-color: ${Colores[TipoCorreo]};
//            color: #ffffff;
//            text-align: center;
//            padding: 15px;
//            font-size: 18px;
//            font-weight: bold;
//        }
//        .body {
//            padding: 15px;
//            color: #333333;
//            text-align: center;
//            background-color: rgba(255, 255, 255, 0.9); /* Fondo sólido con transparencia */
//        }
//        .body h2 {
//            color: ${Colores[TipoCorreo]};
//            font-size: 16px;
//            margin: 10px 0;
//        }
//        .details {
//            margin: 15px 0;
//            text-align: left;
//        }
//        .details p {
//            margin: 5px 0;
//            font-size: 14px;
//        }
//        .details span {
//            font-weight: bold;
//            color: ${Colores[TipoCorreo]};
//        }
//        .footer {
//            background-color: #f0f4f8;
//            text-align: center;
//            font-size: 12px;
//            padding: 10px;
//            color: #666666;
//        }
//        .footer a {
//            color: ${Colores[TipoCorreo]};
//            text-decoration: none;
//        }
//    </style>
// </head>
// <body>
//    <div class="container">
//        <div class="header">
//             ${Titulo[TipoCorreo]}
//        </div>
//        <div class="body">
//            <h2>Hola ${Paciente}</h2>
//            <p>${Texto[TipoCorreo]}</p>
//            <div class="details">
//                <p><span>Fecha:</span> ${Fecha}</p>
//                <p><span>Hora:</span> ${Hora}</p>
//                <p><span>Doctor:</span> ${Profecional}</p>
//                <p><span>Ubicación:</span> Diagonal 75E # 33a -160 Laureles Medellín - Antioquia</p>
//            </div>
//            <p>${TextoFin[TipoCorreo]}</p>
//        </div>
//        <div class="footer">
//            <p>Gracias por confiar en nosotros.</p>
//            <p><a>+57(604)3225262</a> |  <a href="tel:+57(604)3225262">Llámanos</a> </p>
//        </div>
//    </div>
// </body>
// </html>
// `;

var ContenidoHTMLDelCorreo = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f7faff;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 400px;
        margin: 20px auto;
        background-color: #ffffff;
        border: 1px solid #d1e0f2;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        position: relative;
        background-image: url('https://www.clinicacolombianadeimplantes.com/images/logoblanco-2025.png'); /* Ruta de la imagen */
        background-size: 80%; /* Ajusta el tamaño */
        background-repeat: no-repeat;
        background-position: center;
        opacity: 1; /* La opacidad del contenedor completo */
    }
    .container::before {
        content: '';
        background-image: url('https://www.clinicacolombianadeimplantes.com/images/logoblanco-2025.png');
        background-size: 80%; /* Ajusta el tamaño del logo */
        background-repeat: no-repeat;
        background-position: center;
        opacity: 80; /* Opacidad para marca de agua */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0; /* Detrás del contenido */
    }
    .header, .body, .footer {
        position: relative;
        z-index: 1; /* Asegura que el texto esté por encima del fondo */
    }

    .body {
        padding: 15px;
        color: #333333;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.9); /* Fondo sólido con transparencia */
    }
    .body h2 {
        color: ${Colores[TipoCorreo]};
        font-size: 16px;
        margin: 10px 0;
    }
    .details {
        margin: 15px 0;
        text-align: left;
    }
    .details p {
        margin: 5px 0;
        font-size: 14px;
    }
    .details span {
        font-weight: bold;
        color: ${Colores[TipoCorreo]};
    }
    .footer {
        background-color: #f0f4f8;
        text-align: center;
        font-size: 12px;
        padding: 10px;
        color: #666666;
    }
    .footer a {
        color: ${Colores[TipoCorreo]};
        text-decoration: none;
    }

    .header {
        display: flex;
        align-items: center; /* Alinea verticalmente la imagen y el título */
        justify-content: center; /* Centra el contenido horizontalmente */
            background-color: ${Colores[TipoCorreo]};
        color: #ffffff;
        text-align: center;
        padding: 15px;
        font-size: 18px;
        font-weight: bold;
    }

    .logo {
        width: 120px; /* Ajusta el tamaño de la imagen */
        margin-right: 10px; /* Espacio entre la imagen y el título */
        height: 150px; /* Ajusta la altura de la imagen según sea necesario */
    }

    .titulo {
        text-align: center; /* Asegura que el texto esté centrado */
        font-size: 24px; /* Ajusta el tamaño de la fuente según sea necesario */
        font-weight: bold; /* Hace que el texto sea más prominente */
    }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
            <img src="https://www.clinicacolombianadeimplantes.com/images/logoblanco-2025.png" class="logo" />
            <div class="titulo">${Titulo[TipoCorreo]}</div>
        </div>
    <div class="body">
        <h2>Hola ${Paciente}</h2>
        <p>${Texto[TipoCorreo]}</p>
        <div class="details">
            <p><span>Fecha:</span> ${Fecha}</p>
            <p><span>Hora:</span> ${Hora}</p>
            <p><span>Profesional:</span> ${Profecional}</p>
            <p><span>Ubicación:</span> Diagonal 75E # 33a -160 Laureles Medellín - Antioquia</p>
        </div>
        <p>${TextoFin[TipoCorreo]}</p>
    </div>
    <div class="footer">
        <p>Gracias por confiar en nosotros.</p>
        <p><a>+57 3206818343</a> |  <a href="tel:+573206818343">Llámanos</a> </p>
        <p><a>+57 3166900299</a> |  <a href="tel:+573166900299">Llámanos</a> </p>
    </div>
    </div>
    </body>
    </html>
    `;
    console.log(mail);
    var mailOptions = {
        from: '"Clínica Colombiana de Implantes Dentales" <miscitasclini@gmail.com>', 
        to: mail,
        subject: 'Recordatorio de citas',
        html: ContenidoHTMLDelCorreo
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.error('Error al enviar el correo:', error);
        }
        console.log('Correo enviado exitosamente:', info.response);
    });
}

module.exports = Correo;