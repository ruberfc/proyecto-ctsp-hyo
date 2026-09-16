import { AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from "axios";

class Response<T> implements AxiosResponse {

    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig<any>;
    request?: any;

    constructor(response: AxiosResponse) {
        this.data = response.data;
        this.status = response.status;
        this.statusText = response.statusText;
        this.headers = response.headers;
        this.config = response.config;
        this.request = response.request;
    }

    public getData() {
        return this.data;
    }

    public getStatus(): number {
        return this.status;
    }

    public getStatusText(): string {
        return this.statusText;
    }

    public getHeaders(): RawAxiosResponseHeaders | AxiosResponseHeaders {
        return this.headers;
    }

    public getConfig(): InternalAxiosRequestConfig<any> {
        return this.config;
    }
    public getRequest(): any {
        return this.request;
    }

}


export default Response;