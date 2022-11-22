import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUser
  uid=localStorage.getItem("userConnect");

  dataProfil={

    firstName:'',
    lastName:'',
    image:'',
  
};
  constructor(private af:AngularFireAuth,private route:Router,private as:AuthService,private fs:AngularFirestore) {

    if( this.uid!=""){
        
      this.isUser=true
    } else {
      this.isUser=false 
    }

   }


  ngOnInit(): void {


    if (this.uid!="" )
    {
      

    this.fs.collection("user").ref.doc(this.uid).get().then((data)=>
    {
     this.dataProfil.firstName=data.data()['firstName']
     this.dataProfil.lastName=data.data()['lastName']
     this.dataProfil.image=data.data()['image']
        }
        
      );

  }
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
          window.location.reload()

      this.route.navigate(["/login"])
    }).catch(()=>{
      console.log("error")
    })
    localStorage.setItem('userConnect','') 
    localStorage.setItem('adminConnect','') 

    }


admin()
  {
    this.route.navigate(["/loginAdmin"])

  }

}
