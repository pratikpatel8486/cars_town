import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarDetailsComponent } from './cars-list/car-details/car-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelect2Module } from 'ng-select2';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './Admin/login/login.component';
import { CarListComponent } from './Admin/car-list/car-list.component';
import { AddCarsComponent } from './Admin/add-cars/add-cars.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FilterFromListPipe } from './pipes/filter-from-list.pipe';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AboutusComponent,
		ContactusComponent,
		CarsListComponent,
		CarDetailsComponent,
		BrandsComponent,
		LoginComponent,
		CarListComponent,
		AddCarsComponent,
		FilterFromListPipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgSelect2Module,
		MatSelectModule,
		MatFormFieldModule,
		MatIconModule,
		NgxMatSelectSearchModule,
		CarouselModule,
		HttpClientModule,
		NgxDropzoneModule,
		ToastrModule.forRoot()

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
