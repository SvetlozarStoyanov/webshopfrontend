import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import { ProfileInfoComponent } from './components/profile/profile-info/profile-info.component';
import { UpdateProfilePictureComponent } from './components/profile/update-profile-picture/update-profile-picture.component';

export const routes: Routes = [
    { path: 'home', component: ProductListComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: 'profile', component: ProfileInfoComponent, canActivate: [authGuard] },
    { path: 'update-profile-picture', component: UpdateProfilePictureComponent, canActivate: [authGuard] },


];
