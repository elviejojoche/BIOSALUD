// app.ts: aquí se configura Express (middlewares, archivos estáticos y rutas).
import express from "express";
import path from "path";
import indexRoutes from "./routes/index.routes";
import pagesRoutes from "./routes/pages.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import pacientesRoutes from "./routes/pacientes.routes";
import medicosRoutes from "./routes/medicos.routes";
import citasRoutes from "./routes/citas.routes";
import { logger } from "./middlewares/logger";
import { noEncontrado, manejarError } from "./middlewares/errores";

const app = express();

// 1. Middlewares generales
app.use(logger);                                  // muestra cada petición en la terminal
app.use(express.json());                          // permite recibir datos JSON
app.use(express.urlencoded({ extended: true }));  // permite recibir datos de formularios HTML

// 2. Archivos estáticos (CSS, imágenes, JavaScript del navegador)
app.use(express.static(path.join(__dirname, "..", "public")));

// 3. Rutas
app.use("/", pagesRoutes);    // páginas HTML
app.use("/api", indexRoutes); // API (datos en JSON)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/medicos", medicosRoutes);
app.use("/api/citas", citasRoutes);

// 4. Errores (siempre van al final)
app.use(noEncontrado);
app.use(manejarError);

export default app;
