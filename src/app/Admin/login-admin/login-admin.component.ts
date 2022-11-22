import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private sa:AuthService,private route:Router,private fs:AngularFirestore) { }
  messageError
  dataProfil={


    typeAccount:''
  };
  ngOnInit(): void {
  }
  
loginAdmin(f){
  let data=f.value;
 
  this.sa.signIn(data.email,data.password).then((user)=>{
    this.fs.collection("user").ref.doc(user.user.uid).get().then((data)=>
    {

     this.dataProfil.typeAccount=data.data()['typeAccount']
        if (this.dataProfil.typeAccount=="admin")
        {
    localStorage.setItem("adminConnect",user.user.uid);
    localStorage.setItem("userConnect",user.user.uid);
    window.location.reload()

    this.route.navigate(["/dashboard"])
        }
        else 
        this.messageError="Ce compte n est pas un admin"

      })
  }).catch(()=>{
    this.messageError="incorrect email and password"
  })
}

}
