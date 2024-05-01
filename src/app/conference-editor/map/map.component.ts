import { Component, Input, OnChanges } from '@angular/core';
import { MapChart } from 'echarts/charts';
import { TooltipComponent, VisualMapComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
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
        show: false, // Set to false to hide the visualMap component
        min: 0,
        max: 1,
        calculable: true,
        inRange: {
          color: ['#ccc', '#f00'] // Non-highlighted color and highlighted color
        }
      },
      series: [{
        type: 'map',
        map: 'USA',
        data: usaMap.features.map(feature => {
          const isHighlighted = statesWithSchools.has(feature.properties.name);
          if (isHighlighted) {
            console.log(feature.properties.name);
          }
          return {
            name: feature.properties.name,
            value: isHighlighted ? 1 : 0 // 1 to highlight, 0 to not
          };
        }),
        // Define the visual aspects for highlighted/non-highlighted states
        itemStyle: {
          normal: {
            borderColor: '#fff',
            areaColor: '#ccc',
          },
          emphasis: {
            areaColor: '#f00', // Highlight color
            borderWidth: 1,
            borderColor: '#fff',
            label: {
              show: true,
              color: '#fff'
            }
          }
        }
      }]
    };
  }
}
