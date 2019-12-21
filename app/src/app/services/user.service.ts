import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Pagination } from '../pagination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ApiUrl='http://localhost:5000/api/users';    
  constructor(private httpclient: HttpClient) { }    
    
  GetUsersPagination(number : number):Observable<Pagination>{    
    return this.httpclient.get<Pagination>(this.ApiUrl + '?since=' + number);    
  }    
    
  GetDetail(login:string):Observable<User>{    
    return this.httpclient.get<User>(this.ApiUrl + '/' + login);    
  }
}
