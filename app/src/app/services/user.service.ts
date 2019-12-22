import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../pagination';
import { Observable } from 'rxjs';
import { Details } from '../details';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ApiUrl='https://stormy-hollows-04970.herokuapp.com/api/users';    
  constructor(private httpclient: HttpClient) { }    
    
  GetUsersPagination(number : number):Observable<Pagination>{    
    return this.httpclient.get<Pagination>(this.ApiUrl + '?since=' + number);    
  }    
    
  GetDetail(login:string):Observable<Details>{    
    return this.httpclient.get<Details>(this.ApiUrl + '/' + login + '/details');    
  }
}
