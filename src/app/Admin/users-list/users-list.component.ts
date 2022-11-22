import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  dataArray: any=[];
  pages: number = 1;


  constructor(private fs:AngularFirestore,private fb:FormBuilder,private fst:AngularFireStorage) {}


  ngOnInit(): void {
    this.fs.collection("user").snapshotChanges().subscribe((data)=>{
      this.dataArray= data.map(val=>{
        return{
          uid:val.payload.doc.id,
          collection:val.payload.doc.data() 
        }
      })
    })

}
supprimer(id=""){
  this.fs.collection("user").doc(id).delete();
}
}
