import { Component, OnInit, Input } from '@angular/core';
import { PoubelleService } from '../index/poubelle.service';
import * as  _ from "lodash"
@Component({
  selector: 'app-poubsvg',
  templateUrl: './poubsvg.component.html',
  styleUrls: ['./poubsvg.component.css']
})
export class PoubsvgComponent implements OnInit {
  allPoubelle: any =[];
  remplissages:any =[];
 
  constructor(public poubelleService:PoubelleService) { }

  ngOnInit(){
    this.getData()    
}
capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
getData() {
    this.poubelleService.getDataPoubelle()
      .subscribe(response => {
          response.map(res=>{
              res.results.map(re=>{
                re.series.map(r=>{ 
                  r.values.forEach(v => {
                  this.allPoubelle.push({
                        colum:this.capitalizeFirstLetter(r.name),
                        value:v[1],
                        binName:v[2],
                     }) 
                    });
                })
              })
          })
        this.allPoubelle=_.chain(this.allPoubelle)
              .groupBy("binName")
              .map((value, key) => ({ binGroup: key, columns: value }))
              .value()
        
      }, err => {
        console.log(err);
      });
  }
}
