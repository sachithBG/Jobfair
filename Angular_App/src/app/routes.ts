import {Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {UserProfileComponent } from './components/user-profile/user-profile.component';

////////
import {ProfileComponent} from './components/profile/profile.component';
import {UsersManageComponent} from './components/users-manage/users-manage.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {PreloaderComponent} from './components/preloader/preloader.component';
import {FooterComponent} from './components/footer/footer.component';

import {AuthGuard} from './auth/auth.guard';

export const appRoutes: Routes = [
    
];

export const moduleRoutes: Routes = [
    // {
    //     path: 'userProfile', component: ProfileComponent
    // },
    // {
    //     path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard]
    // },
    // {
    //     path: '', redirectTo:'/login', pathMatch: 'full'
    // }
]