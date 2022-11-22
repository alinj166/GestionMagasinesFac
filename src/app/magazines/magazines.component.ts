import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-magazines',
  templateUrl: './magazines.component.html',
  styleUrls: ['./magazines.component.css']
})
export class MagazinesComponent implements OnInit {
  pages: number = 1;
dataArray
searchTerm: string;
  constructor(private fs:AngularFirestore,private route:Router) { }

  ngOnInit(): void {
    this.fs.collection("magazines").snapshotChanges().subscribe((data)=>{
      this.dataArray=data.map(element=>{
        return{
          id:element.payload.doc.id,
          image:element.payload.doc.data()['image'],
          titre:element.payload.doc.data()['titre'],
        }

      })

    })
  }
  detail(id){
    this.route.navigate(['/magazines/'+id])
  }
}
