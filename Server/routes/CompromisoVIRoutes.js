const { Request, TYPES } = require('tedious');
const Router = require('express').Router;
const connection = require('../db');

const router = Router();

router.get('/pruebaHC', async (req, res) => {

    try {
        const request = new Request(
            `SELECT TOP(10) [Id Evaluación Entidad],
            [Documento Entidad], 
            [Fecha Evaluación Entidad] 
            FROM [Evaluación Entidad]`,
            (err) => {
                if (err) {
                    console.error(`Error de ejecución: ${err}`);
                    // En caso de error, enviamos una respuesta y salimos de la función
                    if (!res.headersSent) {
                        res.status(500).send('Error interno del servidor');
                    }
                }
            }
        );

        const resultados = [];

        request.on('row', (columns) => {
            const hc = {
                idevaluacion: columns[0].value,
                fechaevaluacion: columns[1].value,
                DocPaciente: columns[2].value
            };
            resultados.push(hc);
        });

        request.on('requestCompleted', () => {
            console.log('Resultados de la consulta:');
            console.log(resultados);
            if (!res.headersSent) {
                res.json(resultados);  // Envía la respuesta solo si no se ha enviado antes
                // res.status(200).send("holas")
            }
        });

        request.on('error', (err) => {
            console.error('Error en la consulta:', err);
            if (!res.headersSent) {
                res.status(500).send('Error interno del servidor');
            }
        });

        connection.execSql(request);
    } catch (error) {
        console.error('Error en la conexión o en la ejecución de la consulta:', error);
        if (!res.headersSent) {
            res.status(500).send('Error interno del servidor');
        }
    }
});

router.get('/CompromisosInsertados', async (req, res) => {

    try {
        const request = new Request(
            `SELECT        TOP (200) IdCompromisoVI, EstadoEnviado, DocumentoPaciente, NombrePaciente, DocumentoProfesional, NombreProfesional, AliasProfesional, FechaInicio, FechaFin, HoraInicio, HoraFin, CorreoPaciente
FROM            [Cnsta API CompromisoVI Insertador]`,
            (err) => {
                if (err) {
                    console.error(`Error de ejecución: ${err}`);
                    // En caso de error, enviamos una respuesta y salimos de la función
                    if (!res.headersSent) {
                        res.status(500).send('Error interno del servidor');
                    }
                }
            }
        );

        const resultados = [];

        request.on('row', (columns) => {
            const hc = {
                IdCompromisoVI: columns[0].value,
                EstadoEnviado: columns[1].value,
                DocumentoPaciente: columns[2].value,
                NombrePaciente: columns[3].value,
                DocumentoProfesional: columns[4].value,
                NombreProfesional: columns[5].value,
                AliasProfesional: columns[6].value,
                FechaInicio: columns[7].value,
                FechaFin: columns[8].value,
                HoraInicio: columns[9].value,
                HoraFin: columns[10].value,
                CorreoPaciente: columns[11].value
            };
            resultados.push(hc);
        });

        request.on('requestCompleted', () => {
            console.log('Resultados de la consulta:');
            // console.log(resultados);
            if (!res.headersSent) {
                res.json(resultados);  // Envía la respuesta solo si no se ha enviado antes
                // res.status(200).send("holas")
            }
        });

        request.on('error', (err) => {
            console.error('Error en la consulta:', err);
            if (!res.headersSent) {
                res.status(500).send('Error interno del servidor');
            }
        });

        connection.execSql(request);
    } catch (error) {
        console.error('Error en la conexión o en la ejecución de la consulta:', error);
        if (!res.headersSent) {
            res.status(500).send('Error interno del servidor');
        }
    }
});



router.post('/Actualizarinsertado/:IdCompromisoVI', (req, res) => {
    const IdCompromisoVI = req.params.IdCompromisoVI;
    console.log("ID recibido para actualizar:", IdCompromisoVI);

    const requestUpdate = new Request(
        `UPDATE CompromisoVI
        SET EstadoEnviado = 2
        WHERE [Id CompromisoVI] = ${IdCompromisoVI}`,
        (err) => {
            if (err) {
                console.error('Error al actualizar:', err.message);
                return res.status(500).json({ error: 'Error al actualizar el compromiso.' });
            }

            console.log('Actualización exitosa');
            res.json({ success: true, message: 'Compromiso actualizado correctamente.' });
        }
    );

    connection.execSql(requestUpdate);
});

















module.exports = router;



