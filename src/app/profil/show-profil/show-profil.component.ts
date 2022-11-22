import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-show-profil',
  templateUrl: './show-profil.component.html',
  styleUrls: ['./show-profil.component.css']
})
export class ShowProfilComponent implements OnInit {
  uid=localStorage.getItem("userConnect");

  dataProfil={

    firstName:'',
    lastName:'',
    image:'',
    uid:'',
    tel:'',
    dateBirth: new Date(),
    classe:'',
    sexe:'',
    adresse:'',
    typeAccount:''
};
  constructor(private fs:AngularFirestore) { }

  ngOnInit(): void {

    this.fs.collection("user").ref.doc(this.uid).get().then((data)=>
{
 this.dataProfil.firstName=data.data()['firstName']
 this.dataProfil.lastName=data.data()['lastName']
 this.dataProfil.image=data.data()['image']
 this.dataProfil.tel=data.data()['tel']
 this.dataProfil.dateBirth=data.data()['dateBirth'].toDate()
 this.dataProfil.classe=data.data()['classe']
 this.dataProfil.sexe=data.data()['sexe']
 this.dataProfil.adresse=data.data()['adresse']
 this.dataProfil.typeAccount=data.data()['typeAccount']



    }
  );
  }

}
