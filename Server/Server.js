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


const port = 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);

     setInterval(async () => {
        const CompromisoVi = await fetch(`http://${servidor}:3000/api/CompromisosInsertados`);
        const Insertados = await CompromisoVi.json();
         console.log(Insertados[0]);
        for (let i = 0; i < Insertados.length; i++) {
            try {
                Correo(Insertados[i].FechaInicio, Insertados[i].HoraInicio, Insertados[i].NombrePaciente, Insertados[i].NombreProfesional );
                console.log(Insertados[i].IdCompromisoVI);
                
            } catch (error) {
                
            }
        }
        
        

    }, 20000);
});








