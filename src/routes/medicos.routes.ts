// Rutas de la API de médicos (CRUD)
import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/medicos.controller";

const router = Router();

router.get("/", listar);         // ver y buscar médicos
router.get("/:id", obtener);     // ver un médico
router.post("/", crear);         // registrar
router.put("/:id", actualizar);  // editar
router.delete("/:id", eliminar); // eliminar

export default router;
