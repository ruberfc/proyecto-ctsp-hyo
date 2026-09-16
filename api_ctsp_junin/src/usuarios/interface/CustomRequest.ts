import { Request } from "express";

export interface AuthenticatedUser {
    usuario_id: number;
    usuario: string;
    rol_id: number;
    nombre_rol: string;
    tipo_documento_id: number;
    numero_documento: string;
    nombres: string;
    apellidos: string;
    celular: string;
    correo_personal: string;
}

export interface CustomRequest extends Request {
    user: AuthenticatedUser;
}