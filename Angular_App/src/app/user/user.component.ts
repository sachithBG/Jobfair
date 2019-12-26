import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    resizeDiv();
    function resizeDiv() {
      var vpw = $(window).width();
      var vph = $(window).height();
      $('.wrapper').css({'height': vph+30 + 'px'});
      }
  }

}
