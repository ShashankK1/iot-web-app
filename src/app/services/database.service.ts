import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dataRef:AngularFireList<any>;
  private dbPath='/';
  constructor(private db:AngularFireDatabase) {
    this.dataRef = db.list(this.dbPath);
  }

  getAll(){
    return this.dataRef;
  }

  update(key:string,value:any){
    return this.dataRef.update(key,value)
  }
}
