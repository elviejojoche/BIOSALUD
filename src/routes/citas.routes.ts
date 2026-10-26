// Rutas de la API de citas (CRUD)
import { Router } from "express";
import { listar, obtener, crear, actualizar, eliminar } from "../controllers/citas.controller";

const router = Router();

router.get("/", listar);         // ver, buscar y filtrar citas
router.get("/:id", obtener);     // ver una cita
router.post("/", crear);         // registrar
router.put("/:id", actualizar);  // editar o cambiar estado
router.delete("/:id", eliminar); // eliminar

export default router;
