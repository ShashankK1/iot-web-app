import { DatabaseService } from './../../services/database.service';
import { Component, NgZone, OnInit } from '@angular/core';
import Chart  from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private db:DatabaseService,
    private ngZone:NgZone) { }

  ngOnInit(): void {
    this.getChartData();
    
  }

  getChartData(){
    this.db.getAll().snapshotChanges().subscribe((data:any) => {
      this.pumpData = data[1].payload.val()['pumpData'];    
      Object.values(data[2].payload.val()['data']).map((x:any)=>{
        this.ngZone.run(()=>{

          this.data.push(x.data);
          const array = x.time.split(" ");
          this.labels.push(array[3]);
        })
        
      });
      this.ChartOptions = {
        labels: this.labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(255, 255, 255)',
          data: this.data,
        }]
      };
      this.config =  {
        type: 'line',
        data: this.ChartOptions,
        options: {}
      };
  
      const chartRef = <HTMLCanvasElement>document.getElementById('dataChart');
      if(chartRef!==null){
  
        this.chart = new Chart(
          chartRef,
          this.config
          );
      }
    });
  }

  pumpData:number = 0;
  labels:any[] = [];
  ChartOptions:any ;
  data:any[] = [];
  // data = {
  //   labels:[] ,
  //   datasets: [{
  //     label: 'My First dataset',
  //     backgroundColor: 'rgb(255, 255, 255)',
  //     borderColor: 'rgb(255, 255, 255)',
  //     data: [],
  //   }]
  // };

  config:any;

  chart:any;

  async updateValues(){
    let value;
    if(this.pumpData === 0){
      value = 1;
    }
    else{
      value = 0;
    }
    await this.db.update('pump',{'pumpData':value});
    this.pumpData = value;
  }
}
