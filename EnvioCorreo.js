

// Correo() ;


function Correo(Fecha, Hora, Paciente, Profecional, mail ) {
    const nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        host: "mail.ceere.net", // hostname
        secureConnection: false,
        port: 465,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'correomineria@ceere.net',
            pass: '1998Ceere*'
        }
    });

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
                }
                .container::before {
                    content: '';
                    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...');
                    background-size: 80%;
                    background-repeat: no-repeat;
                    background-position: center;
                    opacity: 0.05; /* Marca de agua más tenue */
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }
                .header {
                    background-color: #3a78c3;
                    color: #ffffff;
                    text-align: center;
                    padding: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    z-index: 1;
                    position: relative;
                }
                .body {
                    padding: 15px;
                    color: #333333;
                    text-align: center;
                    background-color: rgba(255, 255, 255, 0.9); /* Fondo sólido con transparencia */
                    z-index: 1;
                    position: relative;
                }
                .body h2 {
                    color: #3a78c3;
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
                    color: #3a78c3;
                }
                .footer {
                    background-color: #f0f4f8;
                    text-align: center;
                    font-size: 12px;
                    padding: 10px;
                    color: #666666;
                    position: relative;
                    z-index: 1;
                }
                .footer a {
                    color: #3a78c3;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    Recordatorio de Cita Médica
                </div>
                <div class="body">
                    <h2>Hola ${Paciente},</h2>
                    <p>Te recordamos que tienes una cita programada con nosotros:</p>
                    <div class="details">
                        <p><span>Fecha:</span> ${Fecha}</p>
                        <p><span>Hora:</span> ${Hora}</p>
                        <p><span>Doctor:</span> ${Profecional}</p>
                        <p><span>Ubicación:</span> Diagonal 75E # 33a -160 Laureles Medellín - Antioquia</p>
                    </div>
                    <p>Por favor, llega 10 minutos antes de tu cita. Si necesitas cancelar o reprogramar, contáctanos con antelación.</p>
                </div>
                <div class="footer">
                    <p>Gracias por confiar en nosotros.</p>
                    <p><a href="tel:+1234567890">Llámanos</a> | <a href="mailto:contacto@clinica.com">contacto@clinica.com</a></p>
                </div>
            </div>
        </body>
        </html>
    `;
console.log(mail);
    var mailOptions = {
        from: '"Clínica Colombiana de Implantes Dentales" <correomineria@ceere.net>',
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