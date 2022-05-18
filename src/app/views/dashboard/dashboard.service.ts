import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { FoodTruck } from "./models";
import { environment } from '../../../environments/environment';

@Injectable()
export class DashboardService {

    url = environment.serviceUrl + 'FoodTruck/';

    constructor(private http: HttpClient) {

    }

    getFoodTrucks(latitude : Number, longitude : Number, search? : string) : Observable<FoodTruck[]> {
        return this.http.get<FoodTruck[]>(this.url + `${latitude}/${longitude}/${search}`);
    }


    getDistance(lat1 : number, lon1: number, lat2: number, lon2: number) 
    {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    toRad(Value : number) 
    {
        return Value * Math.PI / 180;
    }
}