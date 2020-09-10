import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Bin } from '../../admin/index/model/bin';
import { PoubelleService } from '../../admin/index/poubelle.service';
import * as  _ from "lodash";


@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent implements OnDestroy {

	@Input() sidebarVisible: boolean = true;
	@Input() navTab: string = "menu";
	@Input() currentActiveMenu;
	@Input() currentActiveSubMenu;
	@Output() changeNavTabEvent = new EventEmitter();
	@Output() activeInactiveMenuEvent = new EventEmitter();
    public themeClass: string = "theme-cyan";
    public darkClass: string = "";
	private ngUnsubscribe = new Subject();
	
	allPoubelle: any =[];
	remplissages:any =[];
    lastTime;
	bintab: Bin;
	tab:String[][] = [];
	resBintabsubscription: Subscription;

	constructor(private themeService: ThemeService, 
		        private poubelleService:PoubelleService) {
        this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeClass => {
			this.themeClass = themeClass;
        });
        this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
            this.darkClass = darkClass;
        });
	}
	
	ngOnInit(){
		this.resBintabsubscription = this.poubelleService.resBintabsubject.subscribe(
			(data:Bin)=>{
			  this.bintab = data;
			}
		  );
		  this.poubelleService.getBinName();
		  
		  
	}
    
    ngOnDestroy() {
        this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
		this.resBintabsubscription.unsubscribe();
    }

	changeNavTab(tab: string) {
		this.navTab = tab;
	}

	activeInactiveMenu(menuItem: string) {
		this.activeInactiveMenuEvent.emit({ 'item': menuItem });
	}

	changeTheme(theme:string){
		this.themeService.themeChange(theme);
    }
    
    changeDarkMode(darkClass: string) {
        this.themeService.changeDarkMode(darkClass);
	}

	test(){
	   
	   this.poubelleService.getname(this.bintab);
	   this.poubelleService.getDataFin();
	 } 

	 /* getData() {
     
        this.poubelleService.getDataPoubelle().subscribe(
            (response) => {
           console.log(response)
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
                
          }, err => {
            console.log(err);
          });
      }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }  */

	
}
