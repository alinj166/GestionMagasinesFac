import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  dataArray1: any=[];
  dataArray2: any=[];
  pages: number = 1;


  constructor(private fs:AngularFirestore,private fb:FormBuilder,private fst:AngularFireStorage) {}


  ngOnInit(): void {
    this.fs.collection("reservation").snapshotChanges().subscribe((data)=>{
      this.dataArray1= data.map(val=>{
        return{
          uid:val.payload.doc.id,
          collection:val.payload.doc.data() 
        }
      })
    })


}
supprimer(id=""){
  this.fs.collection("reservation").doc(id).delete();
}
}

