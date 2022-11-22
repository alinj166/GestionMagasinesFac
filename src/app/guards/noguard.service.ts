import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NOTFOUND } from 'dns';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoguardService {
  user: string;

  
  constructor(private as:AuthService,private route:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   return new Promise(resolve=>{
     this.user=localStorage.getItem("userConnect");
           if(this.user===""){
         resolve(true)
       }else {
         this.route.navigate(["/home"])
         resolve(false)
       }
     })
  
  }
}
