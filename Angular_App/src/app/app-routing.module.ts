import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersManageComponent } from './components/users-manage/users-manage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: 'signup', component: UserComponent, 
    children: [{path: '', component: SignUpComponent}]
},
{
    path: 'login', component: UserComponent,
    children: [{path: '', component: SignInComponent}]
},
{
    path: 'userprofile', component: UserProfileComponent,
    
},
{
    path: '', redirectTo:'/login', pathMatch: 'full'
},
{
    path: 'usernav', component: NavigationComponent, canActivate: [AuthGuard],
    children: [
        {path: '', component: ProfileComponent},
        {path: 'userprofile', component: ProfileComponent},
        {path: 'usersMange', component: UsersManageComponent},
        {path: 'home', component: HomeComponent},
    ]
     
},
{
    path: 'usersMange', component: UsersManageComponent, canActivate: [AuthGuard]
    // children: [{path: '', component: NavigationComponent},{path: '', component: FooterComponent} ],
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
