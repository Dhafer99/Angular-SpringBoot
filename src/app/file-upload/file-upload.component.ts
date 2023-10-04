
import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtClientService } from './../jwt-client.service';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(private http: HttpClient,private jwtClientService:JwtClientService) {
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.json')) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
      alert('Invalid file format. Please select a .json file.');
    }
  }
  

  uploadFile() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContents = e.target.result;
        const jsonData = JSON.parse(fileContents);
        jsonData['Filename'] = this.selectedFile!.name; // Add the filename as a new property
        console.log('File name :', this.selectedFile!.name); // Log the updated JSON data
        console.log(' json property name', Object.keys(jsonData)[1])
        console.log("TOKEN :"+ this.jwtClientService.getToken());
        this.sendData(jsonData);
      };
      reader.readAsText(this.selectedFile);
      setTimeout(() => {
        
        window.location.reload();
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    }
  }

  sendData(data: any) {
    const headers = new HttpHeaders().set('Authorization', this.jwtClientService.getToken());
    this.http.post('http://localhost:8080/course', data, {headers}).subscribe(
      (response) => {
        console.log('Data sent successfully');
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }

}
