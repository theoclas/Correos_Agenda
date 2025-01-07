const express = require('express');
const cors = require('cors');
const servidor = "HPRED241";
const CompromisoVI = require('./routes/CompromisoVIRoutes');
const Correo = require('../EnvioCorreo');



const app = express();




app.use(cors());
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));
app.set('view engine', 'ejs');



app.use('/api', CompromisoVI);


const port = 3004;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);

    setInterval(async () => {
        const CompromisoVi = await fetch(`http://${servidor}:3004/api/CompromisosInsertados`);
        const Insertados = await CompromisoVi.json();
        console.log(Insertados[0]);
        for (let i = 0; i < Insertados.length; i++) {
            try {
                Correo(Insertados[i].FechaInicio, Insertados[i].HoraInicio, Insertados[i].NombrePaciente, Insertados[i].NombreProfesional, Insertados[i].CorreoPaciente, 1  );
                console.log(Insertados[i].IdCompromisoVI);
                const ActualizarCompromisoInsertado = await fetch(`http://${servidor}:3004/api/ActualizarEstadoEnviado/${Insertados[i].IdCompromisoVI}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                const respuestaActualizar = await ActualizarCompromisoInsertado.json();
                console.log(respuestaActualizar);
            } catch (error) {
                
            }
        }
        
        const CompromisoViActualizados = await fetch(`http://${servidor}:3004/api/CompromisosActualizados`);
        const Actualizados = await CompromisoViActualizados.json();
        console.log(Actualizados[0]);
        for (let i = 0; i < Actualizados.length; i++) {
            try {
                Correo(Actualizados[i].FechaInicio, Actualizados[i].HoraInicio, Actualizados[i].NombrePaciente, Actualizados[i].NombreProfesional, Actualizados[i].CorreoPaciente, 2  );
                console.log(Actualizados[i].IdCompromisoVI);
                const ActualizarCompromisoInsertado = await fetch(`http://${servidor}:3004/api/ActualizarEstadoEnviado/${Actualizados[i].IdCompromisoVI}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                const respuestaActualizar = await ActualizarCompromisoInsertado.json();
                console.log(respuestaActualizar);
            } catch (error) {
                
            }
        }


        const CompromisoViCacelados = await fetch(`http://${servidor}:3004/api/CompromisosCancelados`);
        const Cancelados = await CompromisoViCacelados.json();
        console.log(Cancelados[0]);
        for (let i = 0; i < Cancelados.length; i++) {
            try {
                Correo(Cancelados[i].FechaInicio, Cancelados[i].HoraInicio, Cancelados[i].NombrePaciente, Cancelados[i].NombreProfesional, Cancelados[i].CorreoPaciente, 3  );
                console.log(Cancelados[i].IdCompromisoVI);
                const ActualizarCompromisoInsertado = await fetch(`http://${servidor}:3004/api/ActualizarEstadoEnviado/${Cancelados[i].IdCompromisoVI}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                const respuestaActualizar = await ActualizarCompromisoInsertado.json();
                console.log(respuestaActualizar);
            } catch (error) {
                
            }
        }
        

    }, 10000);
});








