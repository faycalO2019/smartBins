import { Component, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { PoubelleService } from './poubelle.service';
import * as  _ from "lodash"
 
interface marker {
	lat: number;
    lng: number;
    animation:string;
	label?: string;
    draggable: boolean;
    icon?:string
}
@Component({
    selector: 'app-page-leaflet',
    templateUrl: './page-leaflet.component.html',
    styleUrls: ['./page-leaflet.component.css']
})
export class PageLeafletComponent {
    lat: number = 33.596500;
    lng: number =  -7.615167;
    zoom: number = 15;
    allPoubelle: any =[];
    humidity: any =  {};
    temperature: any = {};
    remplissages: any = {};
    isLoadingResults: boolean;
    poubelleRemplissage: any;
    public iconUrl = 'assets/images/mapPoubelle.svg'
    public options = {
        layers: [
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        ],
        zoom: 5,
        center: L.latLng({ lat: 33.596497, lng:  -7.615177 }),
    };
    public renderOptions = {
        suppressMarkers: true,
    }    
    public markerOptions = {
        origin: {
            
            label: 'Bin A',
            draggable:true,
            icon: 'assets/images/mapPoubelle.svg',
        },
        destination: {
            
            icon: 'assets/images/mapPoubelle.svg',
            draggable:true,
            label: 'Bin B',
        },
        waypoints :
        [
    
            {
                icon: 'assets/images/mapPoubelle.svg',
                draggable:true,
                label: 'Bin B',
              },
               {
                icon: 'assets/images/mapPoubelle.svg',
                draggable:true,
                label: 'Bin C',
              }, 
    
        ]
    }
    markers: marker[] = [
        {
            lat: 33.593452, lng: -7.602314,
            label: 'A',
            animation: 'DROP',
            draggable: false,
        icon: 'assets/images/mapPoubelle.svg'
        },
        {
            lat: 33.593500,
            lng: -7.615167,
            label: 'B',
            animation: 'DROP',
            draggable: false,
        icon: 'assets/images/mapPoubelle.svg'
        },
        {
            lat: 33.593509,
            lng: -7.625167,
            label: 'C',
            animation: 'DROP',
            draggable: false,
        icon: 'assets/images/mapPoubelle.svg'
        },
        {
            lat: 33.599513, lng: -7.612809,
            label: 'D',
            animation: 'DROP',
            draggable: false,
        icon: 'assets/images/mapPoubelle.svg'
        },
        {
            lat: 33.593425, lng: -7.623308,
            label: 'E',
            animation: 'DROP',
            draggable: false,
        icon: 'assets/images/mapPoubelle.svg'
        }
    ]
    public visitorsOptions: EChartOption = {};
    public visitsOptions: EChartOption = {};
    public sidebarVisible: boolean = true;

    constructor(private poubelleService:PoubelleService,private sidebarService: SidebarService, private cdr: ChangeDetectorRef) {
        this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
        this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
    }
    origin = { lat: 33.593452, lng: -7.602314 }
    destination = { lat: 33.595111, lng: -7.626228 }

    /* waypoints =
    [

            {
                location: { lat: 33.597416, lng: -7.618031, }
            }, 

            {
                location: { lat: 33.595889, lng: -7.617526 }
            }

    ]  */
    toggleFullWidth() {
        this.sidebarService.toggle();
        this.sidebarVisible = this.sidebarService.getStatus();
        this.cdr.detectChanges();
    }
    markerOver(m: marker) {
        m.animation = 'BOUNCE';
      }
    
      markerOut(m: marker) {
        m.animation = '';
      }
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
            console.log(this.allPoubelle)
          }, err => {
            console.log(err);
          });
      }
    loadLineChartOptions(data, color) {
        let chartOption: EChartOption;
        let xAxisData: Array<any> = new Array<any>();

        data.forEach(element => {
            xAxisData.push("");
        });

        return chartOption = {
            xAxis: {
                type: 'category',
                show: false,
                data: xAxisData,
                boundaryGap: false,
            },
            yAxis: {
                type: 'value',
                show: false
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
                }
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                top: '0%',
                containLabel: false
            },
            series: [{
                data: data,
                type: 'line',
                showSymbol: false,
                symbolSize: 1,
                lineStyle: {
                    color: color,
                    width: 1
                }
            }]
        };
    }

}
