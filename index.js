const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors")
//crear el servidor
const app = express();

//conectar a BD
connectDB();

app.use(cors());
//habilitar express.json
app.use(express.json({ extended: true }));

//puerto de la app
const port = process.env.PORT || 4000;

//importar rutas
app.use("/api/orders", require("./route/orders"))

//arrancar la app
app.listen(port,"0.0.0.0", () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});