import { DataTravelService } from './../../services/data-travel.service';
import { DatabaseService } from './../../services/database.service';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase,ref,onValue } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private weatherHttpService:WeatherService,
    private db:DatabaseService,
    private dataTravel:DataTravelService
  ) { }

  ngOnInit(): void {
    this.getCurrentGeoLocation();
    this.db.getAll().snapshotChanges().subscribe(data => {
      this.pumpData = data[1].payload.val()['pumpData'];
      this.sensorLatitude = data[0].payload.val().latitude;
      this.sensorLongitude = data[0].payload.val().longitude;
    });
  }
  
  sensorLatitude:number;
  placeName:string;
  placeRegion:string;
  sensorLongitude:number;
  todayDate:string[] = [];
  weatherIconUrl:string = '';
  weatherState:string = '';
  temperature:number = 25;
  humidity:number = 5;
  gust:number = 3;
  forecastWeatherData:{url:string,text:string}[] = [];
  pumpData:number =0;
  toggle:boolean = false;
  currentLatitude:number;
  currentLongitude:number;

  getWeatherData(query:string){
    this.weatherHttpService.getCurrentWeatherData(query).subscribe((x:any)=>{
      this.weatherIconUrl = x['current']['condition']['icon'];
      this.weatherState = x['current']['condition']['text'];
      this.temperature = x['current']['temp_c'];
      this.humidity = x['current']['humidity'];
      this.gust = x['current']['gust_kph'];
      this.placeName = x['location']['name'];
      this.placeRegion = x['location']['region'];
      this.currentLatitude = x['location']['lat'];
      this.currentLongitude = x['location']['lon'];
      // console.log("sending data");
      // this.dataTravel.createPath([this.placeName,this.placeRegion,this.currentLatitude,this.currentLongitude]);
    })
  }


  async getForecastData(query:string,days:number){
    
    const res:any = await this.weatherHttpService.getWeatherForecast(query,days).toPromise();
    const data:any[] = res['forecast']['forecastday'];
    data.map((x:any)=>{
      const d:any = x['day']['condition']
      this.forecastWeatherData.push({url:d['icon'],text:d['text']});
    })
  }
  

  getTodaysDate(){
    this.todayDate = [];
    const date = new Date();
    this.todayDate.push(date.getDay().toString());
    this.todayDate.push(date.getDate().toString());
    this.todayDate.push(date.getMonth().toString());
  }

  getCurrentGeoLocation(){
    let latitude ='';
    let longitude = '';
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async (position:any)=>{
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        this.getWeatherData(`${latitude},${longitude}`); 
        await this.getForecastData(`${latitude},${longitude}`,3);
        
      });
      
      
    }
  }

  getSensorLocation(){

    this.forecastWeatherData = [];
    if(!this.toggle){
      console.log('sensor location');
      this.getWeatherData(`${this.sensorLatitude},${this.sensorLongitude}`);
      this.getForecastData(`${this.sensorLatitude},${this.sensorLongitude}`,3);
      this.toggle = true;
     
    }
    else{
      this.getCurrentGeoLocation();
      this.toggle = false;
    }
  }

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
