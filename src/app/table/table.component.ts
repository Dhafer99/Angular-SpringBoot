import { JwtClientService } from './../jwt-client.service';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

interface Equipment {
  cid: number;
  MANUFACTURER: string;
  PART_NUMBER: string;
  SCOM_SERIAL_NUMBER: string;
  PALLET_NUMBER: string;
  SOFTWARE_VERSION: string;
  HARDWARE_VERSION: string;
  acsuserName: string;
  ACS_Password: string;
  REMOTE_GUI_PASSWORD: string;
  LAN_MAC_ADRESS: string;
  WIFI_SSID: string;
  WIFI_PASSWORD: string;
  ONT_SERIAL_NUMBER: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  equipments: Equipment[] = [];
  filteredEquipments: Equipment[] = [];
  searchTerm: string = '';
  errorMessage : string = '';
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private jwtClientService: JwtClientService) {}


  auth : boolean = false ;
  ngOnInit() {
   
    

    this.jwtClientService.setAuthenticated(true);
   
    this.fetchData(this.jwtClientService.getToken());
   
    console.log("TOKEN test : " + this.jwtClientService.getToken());
    console.log("IS AUTHENTICATED "+ this.jwtClientService.getAuthenticated());
   
    //let resp=this.jwtClientService.tableFill(token);
   this.auth = this.jwtClientService.getAuthenticated();
  }

  fetchData(token:any) {
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get<Equipment[]>('http://localhost:8080/courses', {headers}).subscribe(equipments => {
      this.equipments = equipments;
      this.filteredEquipments = equipments; // Set filteredEquipments initially to contain all equipment data
    },
    error => {
      // Handle the error response here
      if (error.status === 403) {
        this.errorMessage = 'you must be logged in to view data !';
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
     
    });
  }



  applyFilter() {
    const searchTerm = this.searchTerm.toLowerCase().trim();
    this.filteredEquipments = this.equipments.filter(equipment =>
      equipment.MANUFACTURER.toLowerCase().includes(searchTerm) ||
      equipment.PART_NUMBER.toLowerCase().includes(searchTerm) ||
      equipment.SCOM_SERIAL_NUMBER.toLowerCase().includes(searchTerm) ||
      equipment.PALLET_NUMBER.toLowerCase().includes(searchTerm) ||
      equipment.SOFTWARE_VERSION.toLowerCase().includes(searchTerm) ||
      equipment.HARDWARE_VERSION.toLowerCase().includes(searchTerm) ||
      equipment.acsuserName?.toLowerCase().includes(searchTerm) || // Updated attribute name and added optional chaining
      equipment.ACS_Password.toLowerCase().includes(searchTerm) ||
      equipment.REMOTE_GUI_PASSWORD.toLowerCase().includes(searchTerm) ||
      equipment.LAN_MAC_ADRESS.toLowerCase().includes(searchTerm) ||
      equipment.WIFI_SSID.toLowerCase().includes(searchTerm) ||
      equipment.WIFI_PASSWORD.toLowerCase().includes(searchTerm) ||
      equipment.ONT_SERIAL_NUMBER.toLowerCase().includes(searchTerm)
    );

    this.cdr.detectChanges(); // Trigger change detection
  }
}
