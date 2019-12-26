import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery';
import { WOW } from 'node_modules/wowjs/dist/wow.min';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      /*====================================
      // scroll top
      ======================================*/

      $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
          $('.scroll-top').fadeIn();
        } else {
          $('.scroll-top').fadeOut();
        }
      });

      //Click event to scroll to top
      $('.scroll-top').on('click',function() {
        $('html, body').animate({ scrollTop: 0 }, 900);
        return false;
      });



      /*=================================*/
      /* WOW */
      /*=================================*/

      new WOW().init();
    });
  }

}
