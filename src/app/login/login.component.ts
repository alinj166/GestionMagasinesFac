import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
messageError


dataProfil={


  typeAccount:''
};
  constructor(private sa:AuthService,private route:Router,private fs:AngularFirestore) { }

  ngOnInit(): void {
  }
login(f){
  let data=f.value;
  this.sa.signIn(data.email,data.password).then((user)=>{

    localStorage.setItem("userConnect",user.user.uid);

    location.reload()
    this.route.navigate(["/home"]);


  }).catch(()=>{
    this.messageError="incorrect email and password"
  })
}
register()
{
  this.route.navigate(["/register"])

}

admin()
  {
    this.route.navigate(["/loginAdmin"])

  }
}
