import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private sa:AuthService,private fs:AngularFirestore,private route:Router) { }

  ngOnInit(): void {
  }
  register(f){
    let data=f.value;
    let dateBirth=new Date(data.dateBirth);

    this.sa.signUp(data.email,data.password).then((user)=>{
     this.fs.collection("user").doc(user.user.uid).set({
       firstName:data.firstName,
       lastName:data.lastName,
       email:data.email,
       // cin:data.cin,
       dateBirth:dateBirth,
       adresse:data.adresse,
       classe:data.classe,
       typeAccount:data.typeAccount,
       image:'',
       sexe:data.sexe,
       tel:data.phone,
       uid:user.user.uid
     }).then(()=>{

       this.route.navigate(["/login"])
     })
    }).catch(()=>{
      console.log("error !")
    })
  }
  login()
{
  this.route.navigate(["/login"])

}

}