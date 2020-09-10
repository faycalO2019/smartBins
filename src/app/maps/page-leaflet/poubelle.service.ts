import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PoubelleService {
  
binAHumdity='http://192.168.5.100:8086/query?pretty=true&db=smart_waste&q=SELECT last("humidite") FROM "humidites" WHERE "nom_poubelle"=\'Bin A\'&t=time.Now().Format(time.RFC3339)'

binATemperature='http://192.168.5.100:8086/query?pretty=true&db=smart_waste&q=SELECT last("temperature")  AS "temperature" FROM "temperatures" WHERE "nom_poubelle"=\'Bin A\'&t=time.Now().Format(time.RFC3339)'

binARemplissage='http://192.168.5.100:8086/query?pretty=true&db=smart_waste&q=SELECT last("niveau_remplissage")  AS "remplissage" FROM "remplissages" WHERE "nom_poubelle"=\'Bin A\'&t=time.Now().Format(time.RFC3339)'

binBHumdity='http://192.168.5.100:8086/query?pretty=true&db=smart_waste&q=SELECT last("humidite"), "nom_poubelle" FROM "humidites" WHERE "nom_poubelle"=\'Bin B\'&t=time.Now().Format(time.RFC3339)'

binBTemperature='http://192.168.5.100:8086/query?pretty=true&db=smart_waste&q=SELECT last("temperature"), "nom_poubelle" FROM "temperatures" WHERE "nom_poubelle"=\'Bin B\'&t=time.Now().Format(time.RFC3339)'

binBRemplissage='http://192.168.5.100:8086/query?pretty=true&db=smart_waste&q=SELECT last("niveau_remplissage"), "nom_poubelle" FROM "remplissages" WHERE "nom_poubelle"=\'Bin B\'&t=time.Now().Format(time.RFC3339)'

constructor(public http:HttpClient) { }
  
  getDataPoubelle(): Observable<any> {

    const response1 = this.http.get(this.binAHumdity);
    const response2 = this.http.get(this.binARemplissage);
    const response3 = this.http.get(this.binATemperature);

    const response4 = this.http.get(this.binBHumdity);
    const response5 = this.http.get(this.binBRemplissage);
    const response6 = this.http.get(this.binBTemperature);

    return forkJoin([response1, response2, response3, response4, response5, response6]);
  }
}
