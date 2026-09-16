# AGENTS.md — Monorepo CTSP Huancayo

Monorepo con dos proyectos independientes en un solo repositorio git.

## Estructura

- `web_trabajador_social/` — Frontend **Next.js 15** (App Router, Tailwind CSS v4, TypeScript, Zustand). Páginas públicas en `/site`, intranet autenticada en `/intranet`, login en `/login`.
- `api_ctsp_junin/` — Backend **NestJS 11** (TypeORM, MariaDB/MySQL, JWT + Passport, Swagger).

## Regla de oro

**Las reglas específicas de cada stack están en su propio `AGENTS.md`**:
- `web_trabajador_social/AGENTS.md`
- `api_ctsp_junin/AGENTS.md`

Al trabajar en un proyecto, lee SOLO el archivo de ese proyecto (y este raíz). No asumas convenciones de un proyecto en el otro.

## Convenciones compartidas (contrato frontend ↔ backend)

- Comunicación: el frontend llama a `http://localhost:8000/` (baseURL configurada con `NEXT_PUBLIC_API_BASE_UR` en `.env`).
- Autenticación: JWT Bearer (`Authorization: Bearer <token>`), login en `POST /usuarios/login-usuario`.
- Respuesta exitosa del backend: `{ rs: <dato> }`. El frontend lo tipa con la interfaz `Lista` (array).
- Resultados tipo mensaje: `ValueMsg[]` con `{ value, msg }` donde `value` = `1` (ok), `2` (warning), `0` (error).
- Campos de datos en `snake_case`; booleanos como `estado` en `1`/`0`; fechas `"1900-01-01"` como valor "vacío".
- Rutas de endpoints en kebab-case con prefijo de módulo (ej. `colegiados/buscar-colegiado-intranet`).

## Reglas generales

- No modificar archivos de configuración de infraestructura (Docker, CI) salvo que se pida explícitamente.
- No subir secretos: `.env`, `JWT_SECRET`, credenciales de BD nunca van en el repo ni en commits.
- Verificar cambios con el comando de typecheck/lint del proyecto afectado (indicado en cada `AGENTS.md`).

## Cuándo actualizar este archivo

Mantener este archivo sincronizado **en el mismo cambio de código** que lo origina. Actualizarlo cuando:

- Cambie el contrato compartido: estructura de respuesta `{ rs }`, esquema `ValueMsg` (1/2/0), autenticación JWT, `NEXT_PUBLIC_API_BASE_UR`/puerto, convenciones `snake_case`/`estado`/fechas `"1900-01-01"` o el patrón de endpoints.
- Un cambio toque ambos proyectos (ej. nuevo endpoint que consume el frontend, cambio de login).
- Se renombren/muevan proyectos o carpetas raíz, o cambie la infraestructura (Docker/CI).
- Un proyecto deje de ser independiente (monorepo se divide o se fusionan).

Forma: bullets cortos, referenciar rutas, sin pegar código, mantener <50 líneas.

**Si el cambio es transversal, actualizar este archivo Y el `AGENTS.md` específico del proyecto afectado.**