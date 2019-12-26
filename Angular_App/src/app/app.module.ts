import { BrowserModule } from '@angular/platform-browser';
import {   NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {UserService} from './shared/user.service';
import {ProfileService} from './shared/profile/profile.service'
import {UsersMangeService} from './shared/usersManage/users-mange.service'

import { appRoutes , moduleRoutes} from './routes';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {AuthGuard} from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { from } from 'rxjs';
import { UsersManageComponent } from './components/users-manage/users-manage.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    NavigationComponent,
    FooterComponent,
    ProfileComponent,
    PreloaderComponent,
    UsersManageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forRoot(moduleRoutes),
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true}, AuthGuard, UserService ,ProfileService,
    UsersMangeService],
    bootstrap: [AppComponent]
})
export class AppModule { }    
