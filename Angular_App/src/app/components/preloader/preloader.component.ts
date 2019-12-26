import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      var preloader = $('#preloader');
      $(window).ready(function () {
        setTimeout(function(){ preloader.remove(); }, 400);
      });
    });
  }

}
