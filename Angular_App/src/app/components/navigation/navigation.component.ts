import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery'; 
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  faBell = faBell;
  faEnvelope =faEnvelope;
  userDetails;
  faSignOutAlt = faSignOutAlt;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res =>{
        this.userDetails = res['user'];
      },
      err =>{console.log(err);}
    )
    "use strict";

    /*=================================*/
    /* mobilemenu-trigger */
    /*=================================*/

    var windowWidth = $(window).width();

    if (windowWidth <= 767) {
      $('#main-navigation li.menu-item-has-children').prepend('<span class="fa fa-angle-down"></span>');
      $('#main-navigation li.menu-item-has-children ul').hide();
      $('#main-navigation li.menu-item-has-children span.fa-angle-down').on('click', function(){
        $(this).siblings('#main-navigation li.menu-item-has-children ul').slideToggle(500);
      });
    };
    // resizeDiv();
    function resizeDiv() {
      var vpw = $(window).width();
      var vph = $(window).height();
      $('.main-header').css({'height': vph+30 + 'px'});
      }

    /*====================================
    // menu-fix
    ======================================*/

    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 100) {
        $('.menu').addClass("affix");
      } else {
        $('.menu').removeClass("affix");
      }
    });

    "use strict";

    /*=================================*/
    /* search popup */
    /*=================================*/

    $('.header-search .top-search').on('click', function() {
      $('.header-search .search-popup').toggleClass('active');
    });

    $('.ak-search .close').on('click', function() {
      $('.search-icon .ak-search').removeClass('active');
    });

    $('.search-overlay').on('click', function() {
      $('.header-search .search-popup').removeClass('active');
    });


    /*=================================*/
    /* toggle-nav */
    /*=================================*/

    $('.header-nav-search .toggle-button').on('click', function() {

      let a = $('body').addClass('menu-active');
      // alert(a);
    });
    $('.close-icon').on('click', function() {
      $('body').removeClass('menu-active');
    });

  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
