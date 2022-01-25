import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http:HttpClient
  ) { }

  getCurrentWeatherData(query:string){
    const params={
      key:environment.WEATHER_KEY,
      q:query
    }
    return this.http.get(`${environment.WEATHER_URL}/current.json`,{params:params});
  }

  getWeatherForecast(query:string,days:number){
    const params={
      key:environment.WEATHER_KEY,
      q:query,
      days:days
    }
    return this.http.get(`${environment.WEATHER_URL}/forecast.json`,{params:params});
  }
  
}
