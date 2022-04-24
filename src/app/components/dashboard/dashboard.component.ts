import { DataTravelService } from './../../services/data-travel.service';
import { DatabaseService } from './../../services/database.service';
import { Component, NgZone, OnInit } from '@angular/core';
import Chart  from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  count:number =0;
  placeName:string;
  placeRegion:string;
  currentLatitude:number;
  currentLongitude:number;
  constructor(private db:DatabaseService,
    private ngZone:NgZone,
    private dataTravel:DataTravelService) { }

  ngOnInit(): void {
    this.getChartData();
    Chart.defaults.animation = false;
    
  }

  getChartData(){
    this.count++;
    this.db.getAll().snapshotChanges().subscribe((data:any) => {
      this.pumpData = data[1].payload.val()['pumpData'];   

      Object.values(data[2].payload.val()['data']).map((x:any)=>{
        this.ngZone.run(()=>{
          this.data.push(x.data);
          // if(x.data > 700){
          //   this.db.update('pump',{'pumpData':0});
          //   this.pumpData = 0;
          // }
          // else if(x.data <350){
          //   this.db.update('pump',{'pumpData':1});
          //   this.pumpData =1;
          // }
          // else if(x.data>=350 && x.data <=700){
          //   this.db.update('pump',{'pumpData':0});
          //   this.pumpData = 0;
          // }
          const array = x.time.split(" ");
          const array2 = array[3];
        
          this.labels.push(array2);
          
          if(this.labels.length>15){
            this.labels.splice(0,1);
            this.data.splice(0,1);
          }
          
        });
        
      });
      this.ChartOptions = {
        labels: this.labels,
        datasets: [{
          label: 'Soil Data',
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(255, 255, 255)',
          data: this.data,
          pointRadius:6,
          pointHoverRadius:10,
          hoverBackgroundColor: 'red',
          hoverBorderColor: 'blue',
          hoverBorderWidth : '3'
         }]
      };
      this.config =  {
        type: 'line',
        data: this.ChartOptions,
        options: {
          layout:{
            padding:20
          },
          scales:{
            x:{
              ticks:{
                autoSkip:false,
                minRotation:90,
                font:{
                  size:20
                },
                color:"rgb(255, 255, 255)",
                maxRotation:90
              },
              grid: {
                display: false
                
              }
              
            },
            y:{
              ticks:{
                color:"rgb(255, 255, 255)",
                font:{
                  size:20
                }
              },
              grid: {
                color:"rgb(255, 255, 255)"
                
              }
            }
          }
        }
      };
  
      const chartRef = <HTMLCanvasElement>document.getElementById('dataChart');
      if(chartRef!==null){
        if(this.chart !== undefined){
          this.chart.destroy();
          
        }
        this.chart = new Chart(
          chartRef,
          this.config
          );
        this.chart.update('none');
        this.chart.options.animation = false;
      }
    });
    // this.dataTravel.dataTravel.subscribe(x=>{
    //   this.ngZone.run(()=>{
    //     console.log(x);
    //   })
    // });
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
    let value = 0;
    if(this.pumpData === 0){
      
      if(confirm('Our data shows u dont need to open water')){
        value = 1;
        await this.db.update('pump',{'pumpData':value});
      }
    
    }
    else{
      
      if(confirm('Our data shows u need to open water')){
        value = 0;
        await this.db.update('pump',{'pumpData':value});
      }
    }

    // if(force === true){
    //   await this.db.update('pump',{'pumpData':val})
    // }
    
    
  }
}
