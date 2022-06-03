import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './cars-list/car-details/car-details.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './Admin/login/login.component';
import { CarListComponent } from './Admin/car-list/car-list.component';
import { AddCarsComponent } from './Admin/add-cars/add-cars.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'about-us', component: AboutusComponent },
	{ path: 'contact-us', component: ContactusComponent },
	{ path: 'carList', component: CarsListComponent },
	{ path: 'carDetails/:id', component: CarDetailsComponent },
	{ path: 'brands', component: BrandsComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'car-list', component: CarListComponent },
	{ path: 'add-cars', component: AddCarsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
