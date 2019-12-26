import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Usersmange} from './usersmange.model';


@Injectable({
  providedIn: 'root'
})
export class UsersMangeService {

  selectedUsersmange: Usersmange = {
    _id: '',
    fullName: '',
    email: '',
    password: ''
  };

  Usersmange: Usersmange[];
  readonly baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  postUsersmange(prof: Usersmange) {
    return this.http.post(this.baseURL + '/userProfile/usersmange',Usersmange);
  }
  getUsersmangeList() {
    return this.http.get(this.baseURL + '/userProfile/usersmange');
  }
  
  putUsersmange(prof: Usersmange) {
    return this.http.put(this.baseURL + '/userProfile/usersmange' + `/${prof._id}`, prof);
  }
  
  deleteUsersmange(_id: string) {
    return this.http.delete(this.baseURL + '/userProfile/usersmange' + `/${_id}`);
  }
}
