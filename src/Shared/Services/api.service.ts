import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class ApiProvider {
    /**
     * set base URL of API
     * @type {string}
     */


    url: string = environment.url;
    // token_url: string = environment.token_url;


    constructor(private httpClient: HttpClient,) {
    }

    getFromHttpClient<T>(endpoint: string, options?: { headers?: HttpHeaders, params?: HttpParams, responseType?: any }) {
        return this.httpClient.get<T>(this.url + endpoint, options).toPromise();
    }

    /**
     * Get Request Mehod for API
     *
     * @param {string} endpoint
     * @param params
     * @param {RequestOptions} options
     * @returns {Observable<Response>}
     */

    get<T>(endpoint: string, options?: { headers?: HttpHeaders, params?: HttpParams, responseType?: any }) {
        return this.httpClient.get<T>(this.url + endpoint, options);
    }

    /**
     * Get Request Mehod for API
     *
     * @param {string} endpoint
     * @param params
     * @param {RequestOptions} options
     * @returns {Observable<Response>}
     */

    put<T>(endpoint: string, options?: { headers?: HttpHeaders, params?: HttpParams, responseType?: any }) {
        return this.httpClient.put<T>(this.url + endpoint, options);
    }

    /**
     * Post Request Mehod for API
     *
     * @param {string} endpoint
     * @param body
     * @param {RequestOptions} options
     * @returns {Observable<Response>}
     */
    post<T>(endpoint: string, body: any, options?: { headers?: HttpHeaders, params?: HttpParams, responseType?: any }) {
        if (endpoint) {
            endpoint = this.url + endpoint;
        } else {
            endpoint = this.url;
        }
        return this.httpClient.post<T>(endpoint, body, options);
    }

    delete<T>(endpoint: string, options?: { headers?: HttpHeaders, params?: HttpParams, responseType?: any }) {
        if (endpoint) {
            endpoint = this.url + endpoint;
        } else {
            endpoint = this.url;
        }
        return this.httpClient.delete<T>(endpoint, options);
    }

}
