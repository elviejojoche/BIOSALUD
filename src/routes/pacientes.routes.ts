// Rutas de la API de pacientes (CRUD)
import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/pacientes.controller";

const router = Router();

router.get("/", listar);         // ver y buscar pacientes
router.get("/:id", obtener);     // ver un paciente
router.post("/", crear);         // registrar
router.put("/:id", actualizar);  // editar
router.delete("/:id", eliminar); // eliminar

export default router;
