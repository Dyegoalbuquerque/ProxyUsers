import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from '../models/repository';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  ApiUrl='http://localhost:5000/api/users';    
  constructor(private httpclient: HttpClient) { }    
    
  GetByLogin(login : string):Observable<Repository[]>{    
    return this.httpclient.get<Repository[]>(this.ApiUrl + '/' + login + '/repos');    
  }      
}
