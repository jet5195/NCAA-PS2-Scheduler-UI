import { Component, OnInit } from '@angular/core';
import { MapChart } from 'echarts/charts';
import { TooltipComponent, VisualMapComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { Conference } from 'src/app/conference';
import { School } from 'src/app/school';
import { ConferenceEditorService } from '../conference-editor.service';

echarts.use([MapChart, CanvasRenderer, TooltipComponent, VisualMapComponent]);

@Component({
  selector: 'app-conference-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  conference!: Conference;
  chartOptions;

  stateHighlightColor: string = '#d4d4d4';

  MAP_ADJUSTMENTS = {
    Alaska: { left: -124, top: 24, width: 20 },
    Hawaii: { left: -128, top: 28, width: 5 },
    'Puerto Rico': { left: -76, top: 26, width: 2 },
  };

  constructor(private conferenceEditorService: ConferenceEditorService) {}

  ngOnInit(): void {
    this.conferenceEditorService.selectedConference.subscribe((conference) => {
      this.conference = conference;
      this.initMap();
    });
  }

  initMap(): void {
    const usaMap = require('src/assets/USA.json');
    this.registerUsaMap(usaMap);
    this.chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
        backgroundColor: 'rgba(255,255,255,0.7)', // Light background for tooltip
        textStyle: {
          color: '#333', // Dark text for readability
        },
        borderColor: this.stateHighlightColor, // Border color matching the visualMap
        borderWidth: 1,
        padding: 10, // Padding inside the tooltip
      },
      visualMap: {
        show: false,
        min: 0,
        max: 1,
        calculable: true,
        inRange: {
          color: ['#eee', this.stateHighlightColor], // Gradient from light gray to light blue
        },
        textStyle: {
          color: '#333', // Text color for the visualMap labels
        },
      },
      geo: {
        map: 'USA',
        roam: true,
        zoom: 1.5,
        center: this.calculateCenter(this.conference.schools),
        itemStyle: {
          areaColor: '#f5f5f5', // Light base color for the map
          borderColor: '#fff', // Border color for the states
          borderWidth: 1,
        },
        emphasis: {
          label: false,
          itemStyle: {
            areaColor: this.stateHighlightColor, // Highlight color on hover
            borderColor: '#fff', // White border on hover
            borderWidth: 1.5,
          },
        },
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.prepareSchoolSeries(this.conference.schools),
        },
        // Map series for highlighting states
        {
          name: 'States',
          type: 'map',
          geoIndex: 0,
          data: this.prepareStateSeries(
            usaMap.features,
            this.conference.schools,
          ),
          tooltip: {
            trigger: 'none',
          },
        },
      ],
    };
  }

  registerUsaMap(usaMap) {
    echarts.registerMap('USA', usaMap, this.MAP_ADJUSTMENTS);
  }

  prepareSchoolSeries(schools) {
    return schools.map((school) => ({
      name: school.name,
      value: [school.longitude, school.latitude],
      symbol: 'image://' + school.logo,
      symbolSize: [35, 35],
    }));
  }

  prepareStateSeries(features, schools) {
    return features.map((feature) => ({
      name: feature.properties.name,
      value: schools.some((school) => school.state === feature.properties.name)
        ? 1
        : 0,
    }));
  }

  calculateCenter(schools: School[]): [number, number] {
    let totalLongitude = 0;
    let totalLatitude = 0;
    schools.forEach((school) => {
      totalLongitude += school.longitude;
      totalLatitude += school.latitude;
    });
    return [totalLongitude / schools.length, totalLatitude / schools.length];
  }
}
