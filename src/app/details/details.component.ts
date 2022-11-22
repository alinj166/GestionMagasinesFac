import { ParseTreeResult } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {
  task:AngularFireUploadTask | undefined;
  ref:AngularFireStorageReference | undefined;
  myform: FormGroup=new FormGroup({});
  message=''
  pages: number = 1;
  path=''
  uid=localStorage.getItem("userConnect");
  dataProfil={
    imag:''
  }
  key :any
  comm
titre:any=''
image:any=''
description:any=''
categorie:any=''
commentair:any=''
idMag:any=''
idUser:any=''
note:any=''
etat:any=''
numero:any=''
dataAllRes
dataAllC
dataAll
dataAllUser
messageError
dataMagazine :any=[
  this.titre,
  this.image,
  this.description,
  this.categorie,
  this.etat,
  this.numero
]
myformC
  comment: any;
  magazine: any;
  user: any;
  reservation: any;
  constructor(private f:FormBuilder,private sa:AuthService,private parms:ActivatedRoute,private fb:AngularFirestore,private route:Router,private fst:AngularFireStorage,) { 
   this.parms.params.subscribe(query=>{
      return this.key = query['id']
    })
    
  }
  navi(id){
    this.route.navigate(['/magazines/'+id])
}


ngOnDestroy(): void {
  this.comment.unsbscribe();
  this.magazine.unsbscribe();
  this.user.unsbscribe();
  this.reservation.unsbscribe();
} 


  ngOnInit(): void {
    this.myformC= this.f.group({
      commentaire:['',Validators.required]
      })

    this.myform = this.f.group({
      dateDeb:['',Validators.required],
      dateFin:['',Validators.required],
      })

    this.fb.collection('magazines').ref.doc(this.key).get().then(data=>{
      this.dataMagazine=data.data()
    })

   this.comment=this.fb.collection("commentaires").snapshotChanges().subscribe((data)=>{
      this.dataAllC=data.map(element=>{
        return{
          id:element.payload.doc.id,
          commentair:element.payload.doc.data()['commentaire'],
          idMag:element.payload.doc.data()['idMag'],
          idUser:element.payload.doc.data()['idUser'],
          note:element.payload.doc.data()['note'],
            }
      })


    })
   this.magazine=this.fb.collection("magazines").snapshotChanges().subscribe((data)=>{
      this.dataAll=data.map(element=>{
        return{
          id:element.payload.doc.id,
          image:element.payload.doc.data()['image'],
          titre:element.payload.doc.data()['titre'],
          etat:element.payload.doc.data()['etat'],
        }
      })
    })
   this.user=this.fb.collection("user").snapshotChanges().subscribe((data)=>{
      this.dataAllUser=data.map(element=>{
        return{
          id:element.payload.doc.id,
          image:element.payload.doc.data()['image'],
          lastName:element.payload.doc.data()['lastName'],
          firstName:element.payload.doc.data()['firstName'],
        }
      })
    })
   this.reservation= this.fb.collection("reservation").snapshotChanges().subscribe((data)=>{
      this.dataAllRes=data.map(element=>{
        return{
          idMag:element.payload.doc.data()['idMag'],
          dateDeb:element.payload.doc.data()['dateDeb'],
          dateFin:element.payload.doc.data()['DateFin'],
        }
      })
    })
    this.fb.collection("user").ref.doc(this.uid).get().then((data)=>{
      this.dataProfil.imag=data.data()['image']
     })
   
  }
  upload($event: any){
    this.path=$event.target.files[0]
  }
  add(){
      let etat
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let d= month + "-" + day + "-" + year;
      let dateD=new Date(this.myform.value.dateDeb)
      let dateF=new Date(this.myform.value.dateFin)
        for (let i = 0; i < this.dataAllRes.length; i++) {
          if(this.dataAllRes[i].idMag==this.key){
            if(new Date(this.dataAllRes[i].dateDeb)>=dateD || new Date(this.dataAllRes[i].DateFin)<=dateD||dateD>dateF||new Date(d)>dateD){
              etat= false
            }
          }
        }
        if(etat==false){this.message='Erreur'}
        else{
          this.Res()
      }
   
  }
  Res(){
    let mydata=this.myform.value;
    const id=Math.random().toString(36).substring(2);
    this.ref=this.fst.ref(id);
    this.task=this.ref.put(this.path)
    this.task.then((data)=>{
      data.ref.getDownloadURL().then(url=>{
        this.fb.collection("reservation").add(
          {
            idUser:this.uid,
            idMag:this.key,
            dateDeb:mydata.dateDeb,
            DateFin:mydata.dateFin,
          }
        ).then(res=>{
          this.message='Ajout fait avec succes'
           this.myform.reset();
         })
         .catch(()=>{console.log('erreur');
         this.message='Erreur'
       })
      })
    })
  }
  addComment(){
      console.log('USer ',this.uid)
      console.log(this.path);
    let mydata=this.myformC.value;
    const id=Math.random().toString(36).substring(2);
    this.ref=this.fst.ref(id);
    this.task=this.ref.put(this.path)
    this.task.then((data)=>{
      data.ref.getDownloadURL().then(url=>{
        this.fb.collection("commentaires").add(
          {
            idUser:this.uid,
            idMag:this.key,
            commentaire:mydata.commentaire
          }
        ).then(res=>{
           console.log(res);
           this.myformC.reset();
         })
         .catch(()=>console.log('Not connected'));
       })
      })
  }
  valid(x,key){
    if(x.idMag==key)
    return true
    else
    return false
  }
  valid_img(elt,key){
    if(elt.id==key)
    return true
    else 
    return false
  }
  valid_Reserve(etat){
    if(etat=='true')
    return true
    else 
    return false
  }
  data_4(){
    let data=[]
    let j=0
    for (let i = 0; i < this.dataAll.length; i++) {
      if(this.dataAll[i].etat=='true' && j<4){
      data[j]=this.dataAll[i]
      j++
    }
    }
    return data
  }
  

  
 
}