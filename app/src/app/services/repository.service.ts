import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repositories } from '../repositories';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  ApiUrl='https://stormy-hollows-04970.herokuapp.com/api/users';    
  constructor(private httpclient: HttpClient) { }    
    
  GetByLogin(login : string):Observable<Repositories>{    
    return this.httpclient.get<Repositories>(this.ApiUrl + '/' + login + '/repos');    
  }      
}
