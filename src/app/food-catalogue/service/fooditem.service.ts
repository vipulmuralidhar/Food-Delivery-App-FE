import { Injectable } from "@angular/core";
import { k8ExternalIp } from "../../constants/url";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";


@Injectable({

    providedIn: 'root'
})

export class FoodItemService {


    private apiUrl = k8ExternalIp + '/foodCatalogue/fetchfoodcatalogueByResurantId/'

    constructor(private http: HttpClient) { }


    getFoodItemsByRestaurant(id: number): Observable<any> {

        return this.http.get<any>(`${this.apiUrl + id}`)
            .pipe(catchError(this.handleError));
    }



    private handleError(error: any) {
        console.error('An Error occurred:', error)
        return throwError(error.message|| error);
    }


}


