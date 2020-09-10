import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLeafletComponent } from './page-leaflet/page-leaflet.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { PoubelleService } from '../admin/index/poubelle.service';
@NgModule({
    declarations: [PageLeafletComponent],
    imports: [
        CommonModule,
        LeafletModule,
        AgmDirectionModule,
        RouterModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyChFwOwpUp9g9lxtTAwRD4VwA4LG0NupEQ'
          }),
        NgxEchartsModule
    ],
    providers:[PoubelleService],
})
export class MapsModule { }
