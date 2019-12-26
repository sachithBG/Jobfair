import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/shared/user.service';
import { ProfileService } from 'src/app/shared/profile/profile.service';

import { userProfile } from '../../shared/profile/profile.model';
declare var M: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ProfileService , UserService]
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService,
    private userService: UserService, private router: Router) { }
    userDetails;
    profileDetails;
    statusCancel;
    statusEdit;
    stateUpdtd;
    stateUpdt;
    birthday;
    i = 1;
    listItems;
    selector1;
    selected;
    model;
    selectedTempProfile;

  ngOnInit() {
    this.resetForm();
    this.selected = 'option2';
    
    listItems: this.listItems = new Array("Male", "Female", "gender", "Other")
    // $('.exampleFormControlSelect1').value = "Female"
    // this.refreshProfileList();
    this.userService.getUserProfile().subscribe(
      res =>{
        this.userDetails = res['user'];  
        // alert(this.userDetails.id)      
    this.profileService.getProfile(this.userDetails.id).subscribe(
      res =>{        
        this.profileDetails = res['userProfile'];  
        // alert(this.profileDetails.birthday)      
      },
      err =>{
         this.selectedTempProfile = {
          userName: "User Name",
          position: "Position",
          office: "office",
          gender:"",
          birthday: "YYYY-MM-DD",
          profile_img: "",
          about: "",
          user:this.userDetails.id
        }
          this.profileService.postProfile(this.selectedTempProfile).subscribe((res) => {
            res =>{        
              this.profileDetails = res['userProfile'];  
              // alert(this.profileDetails.birthday)      
            }
          });
        // this.resetForm();
        console.log(err);
      }
    )
      },
      err =>{console.log(err);}
    )
    
    this.statusEdit = true;  
    this.stateUpdt = true;

    };
  

  // onEdit(emp: Profile) {
  //   this.profileService.selectedProfile = emp;
  // }
  onEdit(){
      this.statusCancel = true;
      this.statusEdit = false;
      this.stateUpdtd = false;
      this.stateUpdt = true;
  }
  onCancel(){
    this.statusCancel = false;
    this.statusEdit = true;
    this.stateUpdtd = false;
    this.stateUpdt = true;
  }
  onUpdate(_id: string, form: NgForm) {
    this.stateUpdtd = true;
    this.stateUpdt = false;
    this.statusCancel = false;
    this.statusEdit = true;
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.profileService.selectedProfile = {
      id: "",
      userName: "",
      position: "",
      office: "",
      gender:"",
      birthday: "",
      profile_img: "",
      about: "",
      user:""
    }
  }

  onSubmit(form: NgForm) {
    // alert(form.value.birthday.year);
    if (form.value.user._id == "") {
      this.profileService.postProfile(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshProfileList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.profileService.putProfile(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshProfileList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshProfileList() {
    this.profileService.getProfileList().subscribe((res) => {
      // this.profileService.userProfile = res as userProfile[];
      // this.profileDetails = res[userProfile]
    });
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.profileService.deleteProfile(_id).subscribe((res) => {
        this.refreshProfileList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
