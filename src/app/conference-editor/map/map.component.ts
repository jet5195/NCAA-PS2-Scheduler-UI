import { Component, Input, OnChanges } from '@angular/core';
import { MapChart } from 'echarts/charts';
import { TooltipComponent, VisualMapComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { map } from 'rxjs/operators';
import { Conference } from 'src/app/conference';
import { School } from 'src/app/school';
echarts.use([MapChart, CanvasRenderer, TooltipComponent, VisualMapComponent]);

@Component({
  selector: 'app-conference-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnChanges {
  @Input() conference!: Conference;
  private isViewInit: boolean = false;
  chartOptions;

  ngAfterViewInit(): void {
    this.isViewInit = true;
    this.initMap();
  }

  ngOnChanges(): void {
    if (this.isViewInit) {
      this.initMap();
    }
  }

  initMap(): void {
    const usaMap = require('src/assets/USA.json');
    echarts.registerMap('USA', usaMap, {
      Alaska: {
        left: -124,
        top: 24,
        width: 20
      },
      Hawaii: {
        left: -128,
        top: 28,
        width: 5
      },
      'Puerto Rico': {
        left: -76,
        top: 26,
        width: 2
      }
    });
    const statesWithSchools = new Set(this.conference.schools.map(school => school.state));

    this.chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}'
      },
      visualMap: {
        show: true,
        min: 0,
        max: 1,
        calculable: true,
        inRange: {
          color: ['#eee', '#b6d8df']
        }
      },
      geo: {
        map: 'USA',
        roam: true,
        zoom: 1.2,
        // center
      },
      series: [
        {
          type: 'scatter',
          map: 'USA',
          coordinateSystem: 'geo',
          data: this.conference.schools.map(school => ({
            name: school.name,
            value: [school.longitude, school.latitude],
            symbol: 'image://' + school.logo,
            symbolSize: [30, 30]
          }))
        },
        // Map series for highlighting states
        {
          name: 'States',
          type: 'map',
          map: 'USA',
          geoIndex: 0,
          data: usaMap.features.map(feature => {
            return {
              name: feature.properties.name,
              value: statesWithSchools.has(feature.properties.name) ? 1 : 0 // 1 to highlight, 0 to not
            };
          })
        }]
    };
  }
}
