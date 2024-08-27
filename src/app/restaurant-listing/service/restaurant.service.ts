import { Injectable } from "@angular/core";
import { k8ExternalIp } from "../../constants/url";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    private apiUrl = k8ExternalIp + '/restaurant/fetchAllRestaurants';


    constructor(private http: HttpClient) { }


    getAllRestaurants(): Observable<any> {

        return this.http.get<any>(`${this.apiUrl}`)
            .pipe(
                catchError(this.handleError)
            );
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return throwError(error.message || error);




    }



}