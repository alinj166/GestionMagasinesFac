import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUser
  constructor(private af:AngularFireAuth,private route:Router,private as:AuthService) {
    this.as.user.subscribe(user=>{
      if(user){
        this.isUser=true
      } else {
        this.isUser=false 
      }
    })
  }

  ngOnInit(): void {
  }
  login()
  {
    this.route.navigate(["/login"])

  }
  register()
  {
    this.route.navigate(["/register"])

  }
Logout(){
this.af.signOut().then(()=>{
  this.route.navigate(["/login"])
}).catch(()=>{
  console.log("error")
})
localStorage.setItem('userConnect','') 

}

admin()
  {
    this.route.navigate(["/loginAdmin"])

  }
  magazine()
  {
    this.route.navigate(["/magazines"])

  }
}
