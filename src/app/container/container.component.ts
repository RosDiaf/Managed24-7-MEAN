import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ITeamMember } from '../team/team.module';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {

  isSubmitted: boolean;
  isServiceFail: boolean;
  isSearchFail: boolean;
  isReloading: boolean;
  isSpinner: boolean;
  isUserId: string;
  users: any;
  filterList: any;
  showAll: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dataService.getUsers()
    .subscribe(res => {
      this.users = res;
      this.filterList = res;
    }, (error) => {
      this.isServiceFail = true;
    });
  }
  getUsersByTerm(term) {
    this.dataService.getUsersByTerm(term)
    .subscribe(res => {
      if (res.length > 0) {
        this.users = res;
        this.filterList = res;
        this.isSearchFail = false;
      } else {
        this.isSearchFail = true;
      }
    }, (error) => {
      this.isServiceFail = true;
    });
  }

  filterUserByTitle(title: any) {
    this.filterList =  this.users.filter(item => {
      return item.title === title;
    });
    this.showAll = true;
  }

  filterUser(index: any) {
    this.filterList = [this.users[index]];
    this.showAll = true;
  }

  filterUserByGender(gender: string) {
    this.filterList =  this.users.filter(item => {
      return item.gender === gender;
    });
    this.showAll = true;
  }

  showAllUsers() {
    this.filterList = this.users;
    this.showAll = !this.showAll;
  }

  deleteUser(userId) {
    this.isSpinner = true;
    this.isUserId = userId;
    this.dataService.deleteUsers(userId)
    .subscribe(
      data => {
          this.getUsers();
      },
      (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
      }
    );
  }
}
