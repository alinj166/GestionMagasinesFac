import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-add-magazine',
  templateUrl: './add-magazine.component.html',
  styleUrls: ['./add-magazine.component.css']
})
export class AddMagazineComponent implements OnInit {
  myform: FormGroup=new FormGroup({});
  message=''
  path=''
  //storage = getStorage();
  task:AngularFireUploadTask | undefined;
  ref:AngularFireStorageReference | undefined;
  constructor(private fb:FormBuilder,private route:Router,
    private fst:AngularFireStorage,private fs:AngularFirestore
    ) { }

  ngOnInit(): void {
    this.myform = this.fb.group({
      titre:['',Validators.required],
      numP:[null,Validators.required],
      dateA: ['',Validators.required],
      dispo : [Boolean],
      description:['']
      })
  }
  //les getter des champ
  public get titreMg(){
    return this.myform.get('titre');
  }
 
  public get numPMg(){
    return this.myform.get('numP');
  }
  public get dateAMg(){
    return this.myform.get('dateA');
  }
  //fin getter
  upload($event: any){
    this.path=$event.target.files[0]
  }
  ajouter(){
    console.log(this.path);
    let mydata=this.myform.value;
    const id=Math.random().toString(36).substring(2);
    this.ref=this.fst.ref(id);
    this.task=this.ref.put(this.path)
    this.task.then((data)=>{
      data.ref.getDownloadURL().then(url=>{
        this.fs.collection("magazines").add(
          {
            image:url,
            titre:mydata.titre,
            
            numero:mydata.numP,
            etat:mydata.dispo,
            description:mydata.description,
            dateArrive:mydata.dateA
          
          }
        ).then(res=>{
          this.message='Ajout fait avec succes'
           console.log(res);
           this.myform.reset();
         })
         .catch(()=>{console.log('erreur');
         this.message='Erreur'
       })
      })
    })

   

  }
  naviguer(){
    this.route.navigate(['/dashboard']);
  }
  

}
