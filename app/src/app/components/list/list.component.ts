
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent  implements OnInit {

  constructor(private userService: UserService) { }
  
  displayedColumns: string[] = ['id', 'login', 'details'];
  dataSourceUser : MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSourceUser = new MatTableDataSource<User>([]);
    this.GetUsers();
  }

  GetUsers(){          
    this.userService.GetUsersPagination(1).subscribe(data=>{
      this.dataSourceUser = new MatTableDataSource<User>(data.data);
      this.dataSourceUser.paginator = this.paginator;
     });  
     
  } 
}
