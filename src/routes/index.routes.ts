// Rutas generales de la API
import { Router, Request, Response } from "express";

const router = Router();

// GET /api/estado -> sirve para comprobar que el servidor responde
router.get("/estado", (req: Request, res: Response) => {
  res.json({
    sistema: "BIOSALUD",
    mensaje: "Servidor funcionando correctamente",
    fecha: new Date().toLocaleString("es-CO"),
  });
});

export default router;
