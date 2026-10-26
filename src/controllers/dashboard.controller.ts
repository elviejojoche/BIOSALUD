// Controlador del Dashboard: recibe la petición y responde con los datos en JSON
import { Request, Response } from "express";
import { obtenerResumen } from "../services/dashboard.service";

export function getResumen(req: Request, res: Response) {
  res.json(obtenerResumen());
}
