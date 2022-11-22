import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
dataArray: any=[];
formupdate: FormGroup=new FormGroup({});
p: number = 1;
message=''
affichage=true
item:any
uidUpdate=""
path=''
task:AngularFireUploadTask | undefined;
ref:AngularFireStorageReference | undefined;
image=""
  constructor(private fs:AngularFirestore,private fb:FormBuilder,private fst:AngularFireStorage) {

   }

   term: any 
  ngOnInit(): void {
    this.fs.collection("magazines").snapshotChanges().subscribe((data)=>{
      this.dataArray= data.map(val=>{
        return{
          uid:val.payload.doc.id,
          collection:val.payload.doc.data() 
        }
      })
    })
   

    this.formupdate = this.fb.group({
      titre:['',Validators.required],
      numP:[null,Validators.required],
      dateA: ['',Validators.required],
      dispo : [Boolean],
      description:[''],
      image:['']
      })
   
      
  }
    //les getter des champ
    public get titreMg(){
      return this.formupdate.get('titre');
    }

    public get numPMg(){
      return this.formupdate.get('numP');
    }
    public get dateAMg(){
      return this.formupdate.get('dateA');
    }
     public get imageMg(){
      return this.formupdate.get('image');
    }
    //fin getter
  supprimer(id=""){
    this.fs.collection("magazines").doc(id).delete();
  }
  setdata(item: any,uid=""){
    console.log('item HTML ',item);
    this.item=item
    this.uidUpdate=uid
    console.log(item.image)
    this.formupdate.patchValue({
      titre:item.titre,
      numP:item.numero,
      dateA: item.dateArrive,
      dispo: item.etat,
      description:item.description,
      image:this.path

    })

  }

  upload($event: any){
    this.path=$event.target.files[0]
    console.log(this.path)
  }
 
  modifier(){
    const id=Math.random().toString(36).substring(2);
    this.ref=this.fst.ref(id);
    this.task=this.ref.put(this.path)
    let mydata=this.formupdate.value;
    this.task.then((data)=>{
      data.ref.getDownloadURL().then(url=>{
    this.fs.collection('magazines').doc(this.uidUpdate).update({
      titre:mydata.titre,
      numero:mydata.numP,
      etat:mydata.dispo,
      description:mydata.description,
      image:url,
      dateArrive:mydata.dateA
    }).then(()=>{
      console.log(data)
      this.affichage=false
      this.message='modification terminer'
    })   })
  })

}


}
