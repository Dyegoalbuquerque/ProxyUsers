import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from '../models/repository';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  ApiUrl='https://stormy-hollows-04970.herokuapp.com/api/users';    
  constructor(private httpclient: HttpClient) { }    
    
  GetByLogin(login : string):Observable<Repository[]>{    
    return this.httpclient.get<Repository[]>(this.ApiUrl + '/' + login + '/repos');    
  }      
}
