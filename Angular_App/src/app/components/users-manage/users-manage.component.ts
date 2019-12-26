import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery';
import { ProfileService } from 'src/app/shared/profile/profile.service';
import { UsersMangeService } from 'src/app/shared/usersManage/users-mange.service';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { faDownload } from '@fortawesome/free-solid-svg-icons';


import { userProfile } from '../../shared/profile/profile.model';
import { Usersmange } from 'src/app/shared/usersManage/usersmange.model';
declare var M: any;

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css'],
  providers:[ProfileService, UsersMangeService]
})
export class UsersManageComponent implements OnInit {

  constructor(private profileService: ProfileService, private usersMangeService: UsersMangeService, private router: Router) { }
  userMnDetails;
  searchValue:string = '';

  faDownload = faDownload;
  ngOnInit() {
    this.resetForm();
    this.refreshProfileList();


    $(document).ready(function(){
      // resizeDiv();
      $('.filterable .btn-filter').click(function(){
          var $panel = $(this).parents('.filterable'),
          $filters = $panel.find('.filters input'),
          $tbody = $panel.find('.table tbody');
          if ($filters.prop('disabled') == true) {
              $filters.prop('disabled', false);
              $filters.first().focus();
          } else {
              $filters.val('').prop('disabled', true);
              $tbody.find('.no-result').remove();
              $tbody.find('tr').show();
          }
      });
  
      $('.filterable .filters input').keyup(function(e){
          /* Ignore tab key */
          var code = e.keyCode || e.which;
          if (code == 9) return;
          /* Useful DOM data and selectors */
          var $input = $(this),
          inputContent = $input.val().toString().toLowerCase(),
          $panel = $input.parents('.filterable'),
          column = $panel.find('.filters th').index($input.parents('th')),
          $table = $panel.find('.table'),
          $rows = $table.find('tbody tr');
          /* Dirtiest filter function ever ;) */
          var $filteredRows = $rows.filter(function(){
              var value = $(this).find('td').eq(column).text().toLowerCase();
              return value.indexOf(inputContent) === -1;
          });
          /* Clean previous no-result if exist */
          $table.find('tbody .no-result').remove();
          /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
          $rows.show();
          $filteredRows.hide();
          /* Prepend no-result row if all rows are filtered */
          if ($filteredRows.length === $rows.length) {
              $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
          }
      });
  });

  
  // function resizeDiv() {
  //   var vpw = $(window).width();
  //   var vph = $(window).height();
  //   $('.profile-body').css({'height': vph+30 + 'px'});
  //   }

  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.usersMangeService.selectedUsersmange = {
      _id: "",
      fullName: "",
      email: "",
      password: ""
    }
    this.searchValue = '';
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.usersMangeService.putUsersmange(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshProfileList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.usersMangeService.putUsersmange(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshProfileList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshProfileList() {
    this.usersMangeService.getUsersmangeList().subscribe((res) => {
      this.userMnDetails = res['user'];
      this.usersMangeService.Usersmange = res['user'];
    });
  }

  onEdit(emp: Usersmange) {
    this.userMnDetails = emp;
    this.usersMangeService.selectedUsersmange = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.usersMangeService.deleteUsersmange(_id).subscribe((res) => {
        this.refreshProfileList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
}
