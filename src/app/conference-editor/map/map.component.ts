import { Component, Input, OnChanges } from '@angular/core';
import * as echarts from 'echarts';
import { Conference } from 'src/app/conference';
import { DataService } from 'src/app/data.service';
import { School } from 'src/app/school';

@Component({
  selector: 'app-conference-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnChanges {
  @Input() conference!: Conference;
  conferenceSchools: School[] = [];

  constructor(private dataService: DataService){
  }

  ngOnChanges(): void {
    this.dataService.getSchoolsByConference(this.conference.name).subscribe(data => {
      this.conferenceSchools = data;
      console.log("got schools for map");
    })

    this.initMap();
  }

  initMap(): void {
    const chart = echarts.init(document.getElementById('conference-map'));
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}'
      },
      series: [{
        type: 'map',
        map: 'USA', // Assuming you're displaying a map of the USA
        data: this.conferenceSchools.map(school => ({
          name: school.name,
          value: 1
        }))
      }]
    };
    chart.setOption(option);
  }
}
