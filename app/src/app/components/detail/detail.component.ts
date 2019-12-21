import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Repository } from '../../models/repository';
import { RepositoryService } from '../../services/repository.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent  implements OnInit {


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  user: User;
  repositories: Repository[];
  login: string;
  displayedColumns: string[] = ['id', 'name', 'url'];
  dataSource : MatTableDataSource<Repository>;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private repositoryService: RepositoryService) { 
    this.route.params.subscribe(res => this.login = res.login);
    this.user = new User();
  }

  ngOnInit() {

    this.dataSource = new MatTableDataSource<Repository>([]);
    this.GetUser(this.login);
    this.GetRepositories(this.login);
  }

  GetUser(login : string){          
    this.userService.GetDetail(login).subscribe(data=>{
      this.user = data;
     });  
  
  } 

  GetRepositories(login : string){          
    this.repositoryService.GetByLogin(login).subscribe(data=>{     
      this.dataSource = new MatTableDataSource<Repository>(data);
     });    

  } 
}