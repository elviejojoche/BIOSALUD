// Middlewares para manejar rutas inexistentes (404) y errores del servidor (500)
import { Request, Response, NextFunction } from "express";
import path from "path";

// Se ejecuta cuando ninguna ruta coincide con la URL pedida
export function noEncontrado(req: Request, res: Response) {
  // Si es una ruta de la API respondemos JSON, si no, la página 404
  if (req.url.startsWith("/api")) {
    res.status(404).json({ error: "Ruta no encontrada" });
  } else {
    res.status(404).sendFile(path.join(__dirname, "..", "..", "views", "404.html"));
  }
}

// Se ejecuta cuando ocurre un error inesperado en alguna ruta
export function manejarError(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Ocurrió un error en el servidor" });
}
