// Rutas de la API del Dashboard
import { Router } from "express";
import { getResumen } from "../controllers/dashboard.controller";

const router = Router();

// GET /api/dashboard -> totales, próximas citas y pacientes recientes
router.get("/", getResumen);

export default router;
