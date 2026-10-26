// Rutas de las páginas HTML (lo que ve el usuario en el navegador)
import { Router, Request, Response } from "express";
import path from "path";

const router = Router();

// Carpeta donde están los archivos HTML
const VIEWS = path.join(__dirname, "..", "..", "views");

// GET / -> página principal
router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(VIEWS, "index.html"));
});

// GET /dashboard -> panel de resumen
router.get("/dashboard", (req: Request, res: Response) => {
  res.sendFile(path.join(VIEWS, "dashboard.html"));
});

// GET /pacientes -> gestión de pacientes
router.get("/pacientes", (req: Request, res: Response) => {
  res.sendFile(path.join(VIEWS, "pacientes.html"));
});

// GET /medicos -> gestión de médicos
router.get("/medicos", (req: Request, res: Response) => {
  res.sendFile(path.join(VIEWS, "medicos.html"));
});

// GET /citas -> gestión de citas
router.get("/citas", (req: Request, res: Response) => {
  res.sendFile(path.join(VIEWS, "citas.html"));
});

export default router;
