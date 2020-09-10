import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin, Subject } from 'rxjs';
import { Bin } from './model/bin';
import { resolve } from 'url';
import { element } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class PoubelleService {

response1:any[] = [];
response2: any[] = [];
response3: any[] = [];
binHumdity:Array<String> = [];
binTemperature:Array<String> = [];
binNiveau:Array<String> = [];
binName:Array<String> = [];  
tab:String [][] =[];
bintab:Bin;
resBintabsubject = new Subject<Bin>();


emitResBintabsubject(){
  this.resBintabsubject.next(this.bintab);
}

getBinName() {
  const reqBin = 'http://51.210.42.196:8086/query?pretty=true&db=smart_waste&q=SELECT distinct("nom_poubelle") FROM "remplissages"&t=time.Now().Format(time.RFC3339)';
  return new Promise(
    (resolve, reject) => {
      this.http.get<Bin>(reqBin).subscribe(
        (Response)=>{
          resolve(this.bintab = Response);
          this.emitResBintabsubject();
        },(error)=>{
          reject(error);
          console.log("Erreur");
        }
      );
    }
  );

}

getname(data:Bin){
  this.tab = data.results[0].series[0].values;
  for(let i = 0;i<this.tab.length;i++){
    var s= this.tab[i][1].split(" ",2)[1];
    this.binName.push(s); 
    //console.log(this.binName);
  }
}  

getDataFin(){

 
 for (let i = 0; i<this.binName.length;i++){

this.binHumdity.push('http://51.210.42.196:8086/query?pretty=true&db=smart_waste&q=SELECT last("humidite"), "nom_poubelle" FROM "humidites" WHERE "nom_poubelle"=\'Bin '+this.binName[i]+'\'&t=time.Now().Format(time.RFC3339)');
console.log(this.binHumdity[i]);
this.binTemperature.push('http://51.210.42.196:8086/query?pretty=true&db=smart_waste&q=SELECT last("temperature"), "nom_poubelle" FROM "temperatures" WHERE "nom_poubelle"=\'Bin '+this.binName[i]+'\'&t=time.Now().Format(time.RFC3339)');
console.log(this.binTemperature[i]);
this.binNiveau.push('http://51.210.42.196:8086/query?pretty=true&db=smart_waste&q=SELECT last("niveau_remplissage"), "nom_poubelle" FROM "remplissages" WHERE "nom_poubelle"=\'Bin '+this.binName[i]+'\'&t=time.Now().Format(time.RFC3339)');
console.log(this.binNiveau[i]);
  }
} 


constructor(public http:HttpClient) { }
 




/* getTestData(): Observable<any> {
return this.http.get(this.binHumdity) 
}  */



  getDataPoubelle():any { 

    for (let i = 0; i<this.binName.length;i++){
    
    this.response1[i] = this.http.get(""+this.binHumdity[i]);
    this.response2[i] = this.http.get(""+this.binTemperature[i]);
    this.response3[i] = this.http.get(""+this.binNiveau[i]);

    }

    
    return forkJoin(
      [
        this.response1,
        this.response2,
        this.response3,
        
    ])
   };

}
