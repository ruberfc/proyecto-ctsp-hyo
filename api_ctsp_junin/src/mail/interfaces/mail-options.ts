export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface RecoveryCodeData {
  nombre: string;
  codigo: string;
  tipo: 'usuario' | 'colegiado';
  expiracionMinutos: number;
}