import axios, { AxiosError, AxiosResponse } from "axios";
import Response from "./response";
import RestError from "./restError";

class Resolve {

    static async create<T>(value: any): Promise<Response<T> | RestError> {
        try {        
            const response: AxiosResponse = await value;          
            return new Response<T>(response);
        } catch (ex) {          
            if (axios.isAxiosError(ex)) {
                return new RestError(ex as AxiosError);
            } else {
                return new RestError("Algo salío mal, intente nuevamente.");
            }
        }
    }

}
export default Resolve;