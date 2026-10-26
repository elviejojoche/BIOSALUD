// Middleware que muestra en la terminal cada petición que llega al servidor
import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  const hora = new Date().toLocaleTimeString("es-CO");
  console.log(`[${hora}] ${req.method} ${req.url}`);
  next(); // continúa con la siguiente función (la ruta)
}
