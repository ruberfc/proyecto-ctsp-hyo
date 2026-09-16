import { AxiosError } from "axios";
import { Types } from "../emun/types";

class RestError {

    private type: Types;
    private message: string;
    private status: number = 0;

    public constructor(error: AxiosError | string) {
        if (error instanceof AxiosError) {
            if (error.response) {
                this.type = Types.RESPOSE;
                this.status = error.response.status;
                this.message = this.handleError(error.response.status, error.response.data);
            } else if (error.request) {
                this.type = Types.REQUEST;
                this.message = "No se pudo obtener la respuesta del servidor.";
            } else {
                if (error.message === "canceled") {
                    this.type = Types.CANCELED;
                    this.message = "Se canceló la solicitud la servidor";
                } else {
                    this.type = Types.ERROR;
                    this.message = error.message ? error.message : "Algo salió mal, intente en un par de minutos.";
                }
            }
        } else {
            this.type = Types.ERROR;
            this.message = error;
        }
    }

    public handleError(status: number, error: any) {
        switch (status) {
            case 400:
                return error.message;
            case 401:
                return "Unauthorized";
            case 403:
                return "Forbidden";
            case 404:
                return error.message;
            case 500:
                return error.message;
            case 502:
                return "Bad gateway";
            default:
                return "Huy! Algo salió mal.";
        };
    }

    public getType(): Types {
        return this.type;
    }

    public getMessage(): string {
        return this.message;
    }

    public getStatus(): number {
        return this.status;
    }

}

export default RestError;