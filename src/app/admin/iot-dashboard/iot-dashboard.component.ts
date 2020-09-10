import { Component, ChangeDetectorRef, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription, Observable } from 'rxjs';
import { PoubelleService } from '../index/poubelle.service';
import * as  _ from "lodash"
import { Bin } from '../index/model/bin';
@Component({
    selector: 'app-iot-dashboard',
    templateUrl: './iot-dashboard.component.html',
    styleUrls: ['./iot-dashboard.component.css']
})
export class IotDashboardComponent implements OnInit {

    allPoubelle: any =[];
    remplissages:any =[];
    lastTime:any;
    resBintabsubscription: Subscription;
    bintab: Bin;
    tab:String[][] = [];

    constructor(private poubelleService:PoubelleService,private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private themeService: ThemeService) {
    }
    ngOnInit(){
      //this.getData();
    

      this.resBintabsubscription = this.poubelleService.resBintabsubject.subscribe(
        (data:Bin)=>{
          this.bintab = data;
        }
      );
      this.poubelleService.getBinName();
      
      
    }

    getData() {

        this.poubelleService.getDataPoubelle().subscribe(
            (response:any) => {
           console.log(response);
              response.map(res=>{
                  res.results.map(re=>{
                    re.series.map(r=>{ 
                      r.values.forEach(v => {
                      this.allPoubelle.push({
                            colum:this.capitalizeFirstLetter(r.name),
                            value:v[1],
                            time:v[0],
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
              this.allPoubelle.map(p=>{
                  p.columns.forEach(element => {
                   if(element.colum=='Remplissages'){
                        this.lastTime=element.time
                      }
                  });
              })
              this.lastTime.slice(0, 20) 
           }
          , err => {
            console.log(err);
          });
        }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1); 
      } 

      ngOnDestroy(){
        this.resBintabsubscription.unsubscribe();
      }
      test(){
         this.tab = this.bintab.results[0].series[0].values;
        for(let i = 0;i<this.tab.length;i++){
           console.log(this.tab[i][1].split(" ",2)[1]);
      
        }
        //this.poubelleService.getname(this.bintab);
      } 
}

