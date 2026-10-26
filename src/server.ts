// server.ts: punto de entrada. Solo enciende el servidor.
import fs from "fs";

// Usamos la hora de Colombia (el servidor de Render está en otra zona horaria)
process.env.TZ = "America/Bogota";
import app from "./app";

// Si existe el archivo .env, carga sus variables (PORT, datos de MySQL, etc.)
if (fs.existsSync(".env")) {
  process.loadEnvFile();
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BIOSALUD funcionando en http://localhost:${PORT}`);
});
