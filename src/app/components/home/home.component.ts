import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private weatherHttpService:WeatherService
  ) { }

  ngOnInit(): void {
    this.getCurrentGeoLocation();
  }
  
  todayDate:string[] = [];
  weatherIconUrl:string = '';
  weatherState:string = '';
  temperature:number = 25;
  humidity:number = 5;
  gust:number = 3;


  getWeatherData(query:string){
    this.weatherHttpService.getCurrentWeatherData(query).subscribe((x:any)=>{
      console.log(x);
      this.weatherIconUrl = x['current']['condition']['icon'];
      this.weatherState = x['current']['condition']['text'];
      this.temperature = x['current']['temp_c'];
      this.humidity = x['current']['humidity'];
      this.gust = x['current']['gust_kph'];
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
      navigator.geolocation.getCurrentPosition((position:any)=>{
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        this.getWeatherData(`${latitude},${longitude}`);
      });
      
      
    }
  }

}
