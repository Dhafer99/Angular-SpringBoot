import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from './equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentServiceService {

  private EquipmentUrl : string ;
  constructor(private http : HttpClient) { 
    this.EquipmentUrl = 'http://localhost:8080/course'
  }

  public findAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.EquipmentUrl);
  }

  public save(equipment: Equipment) {
    return this.http.post<Equipment>(this.EquipmentUrl, equipment);
  }

}
