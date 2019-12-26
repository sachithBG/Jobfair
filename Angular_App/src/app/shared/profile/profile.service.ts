import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {userProfile} from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  selectedProfile: userProfile = {
    id: '',
    userName: '',
	  position: '',
    office: '',
    gender:'',
    birthday: '',
    profile_img: '',
    about: '',
    user:''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };


  userProfile: userProfile[];
  readonly baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  postProfile(prof: userProfile) {
    return this.http.post(this.baseURL + '/userProfile/profile/' + `${prof.user}`, prof);
  }
  
  getProfileList() {
    return this.http.get(this.baseURL + '/userProfile/profile');
  }
  getProfile(_id: string) {
    return this.http.get(this.baseURL + '/userProfile/profile' + `/${_id}`);
  }
  putProfile(prof: userProfile) {
    return this.http.put(this.baseURL + '/userProfile/profile' + `/${prof.id}`, prof);
  }
  
  deleteProfile(_id: string) {
    return this.http.delete(this.baseURL + '/userProfile/profile' + `/${_id}`);
  }
}
