import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {
user: string;
constructor(private as:AuthService,private route:Router) { }
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
 return new Promise(resolve=>{
   this.user=localStorage.getItem("adminConnect");
     if(this.user!==""){

       resolve(true)
        
     }else {
       this.route.navigate(["/loginAdmin"])
       resolve(false)
     }

 }) 
}

}


