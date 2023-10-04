import { Component, OnInit } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  authRequest: any = {
    userName: '',
    password: ''
  };

  response: any;
  errorMessage: string = ''; // Variable to store the error message
  isAuthenticated: boolean = false;
  constructor(private service: JwtClientService,private router: Router, private jwtClientService: JwtClientService) { }

  ngOnInit() {
    // Initialize any necessary data or logic on component initializatio
   this.isAuthenticated=this.jwtClientService.getAuthenticated();
    console.log("is authenticated : " + this.isAuthenticated);
  }

  public getAccessToken() {
    let resp = this.service.generateToken(this.authRequest);
    
    resp.subscribe(
      data => {this.accessApi(data)
       this.jwtClientService.setAuthenticated(true);
        
    }
      ,
      error => {
        // Handle the error response here
        if (error.status === 500) {
          this.errorMessage = 'Invalid credentials';
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
        this.response = null; // Clear the response in case of error
      }
    );
  }

  public accessApi(token: any) {
   
    let resp = this.service.welcome(token);
   this.jwtClientService.setToken(token)
    resp.subscribe(
      data => {
        
        this.response = data;
        this.errorMessage = ''; // Clear any previous error messages on successful response
        this.router.navigate(['/View']);
      },
      error => {
        // Handle the error response here
        if (error.status === 500) {
          this.errorMessage = 'Invalid credentials';
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
        this.response = null; // Clear the response in case of error
      }
    );
  }
  public logout(){
    this.jwtClientService.setAuthenticated(false);
    this.jwtClientService.EmptyToken();
    localStorage.removeItem("token");
    window.location.reload();
  }
}
