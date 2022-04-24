import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTravelService {

  dataTravel=new Subject<any>();
  constructor() { }

  createPath(obj:any){
    return this.dataTravel.next(obj);
  }
}
