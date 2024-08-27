import { Injectable } from "@angular/core";
import { OrderDTO } from "../models/OrderDTO";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { k8ExternalIp } from "../../constants/url";



@Injectable(
    { providedIn: "root" }
)
export class OrderService {


    private apiUrl = k8ExternalIp + '/order/saveOrder'


    constructor(private http: HttpClient) { }


    saveOrder(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, data);

    }


    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(error.message || error);
    }





}