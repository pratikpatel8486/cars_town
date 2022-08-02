import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from 'src/Shared/Services/cars.service';
import { CommonService } from 'src/Shared/Services/common.service';
import { FilterCarModel } from '../model/cars.model';
declare var $: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public car_brand: Array<Select2OptionData> = [];
	public body_type: Array<Select2OptionData> = [];
	public car_modal: Array<Select2OptionData> = [];
	public car_year: Array<Select2OptionData> = [];
	public filterCarModel: FilterCarModel = new FilterCarModel();
	public latestCarsDataList: any[] = [];
	public options: any;
	public Selectedbrand: any;
	public brandDataList: any[] = [];
	public brandModalDataList: any[] = [];
	public brandVariantDataList: any[] = [];
	public fuelTypeList: any[] = [];
	public ownershipList: any[] = [];
	public RTOList: any[] = [];
	public transmissionList: any[] = [];
	public insuranceList: any[] = [];

	slides = [342, 453];
	public carsDataList: any[] = [];

	slideConfig = {
		"slidesToShow": 3,
		"slidesToScroll": 1,
		"nextArrow": "<div class='nav-btn next-slide'></div>",
		"prevArrow": "<div class='nav-btn prev-slide'></div>",
		"dots": true,
		"infinite": true,
		"autoplay": true,
		"autoplaySpeed": 2000
	};

	latestCollection: OwlOptions = {
		loop: true,
		autoplay: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			},
			940: {
				items: 3
			}
		},
		nav: true
	};
	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: false,
		touchDrag: true,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			}
		},
		nav: true
	};
	filterKMSDriven: any[] = [];

	constructor(public service: CarsService,
		public commonService: CommonService,
		private toastr: ToastrService, private router: Router) { }


	ngOnInit(): void {
		this.getAllBrand();
		this.getAllBrandModel();
		this.getAllBrandVariant();
		this.fuelTypeList = this.commonService.fuelTypeList;
		this.ownershipList = this.commonService.ownershipList;
		this.RTOList = this.commonService.RTOList;
		this.transmissionList = this.commonService.transmissionList;
		this.insuranceList = this.commonService.insuranceList;
		this.filterKMSDriven = this.commonService.filterKMSDriven;
		this.getLatestCars();
		this.getAllBrand();
		this.body_type = [
			{
				id: 'sedan',
				text: 'Sedan'
			},
			{
				id: 'hatchback',
				text: 'Hatchback'
			},
			{
				id: 'suv',
				text: 'SUV'
			},
			{
				id: 'limousine',
				text: 'Limousine'
			},
			{
				id: 'micro',
				text: 'Micro'
			},
		]
		this.car_brand = [
			{
				id: 'hyundai',
				text: 'Hyundai'
			},
			{
				id: 'Tata_motors',
				text: 'Tata Motors'
			},
			{
				id: 'kia',
				text: 'Kia'
			},
			{
				id: 'toyota',
				text: 'Toyota'
			}
		];
		this.car_modal = [
			{
				id: 'model01',
				text: 'Model 01'
			},
			{
				id: 'model02',
				text: 'Model 02'
			},
			{
				id: 'model03',
				text: 'Model 03'
			},
			{
				id: 'model04',
				text: 'Model 04'
			}
		];
		this.car_year = [
			{
				id: '2018',
				text: '2018'
			},
			{
				id: '2019',
				text: '2019'
			},
			{
				id: '2020',
				text: '2020'
			},
			{
				id: '2021',
				text: '2021'
			}
		]
		this.options = {
			multiple: true,
			theme: 'classic',
			closeOnSelect: false
		}
	}
	async getAllBrand() {
		await this.service.GetAllBrand().then(res => {
			if (res.status) {
				this.brandDataList = res.data;
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		})

	}

	async getAllBrandModel() {
		await this.service.GetAllBrandModel().then(res => {
			if (res.status) {
				this.brandModalDataList = res.data;
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		})

	}

	async getAllBrandVariant() {
		await this.service.GetAllBrandVariant().then(res => {
			if (res.status) {
				this.brandVariantDataList = res.data;
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		})

	}
	async getLatestCars() {
		await this.service.GetLatestCars
			().then(res => {
				if (res.status) {
					this.latestCarsDataList = res.data;
				} else {
					this.toastr.error(res.message, 'Error!');
				}
			})

	}

	public doClickCarDetails(car: any) {
		this.router.navigate(['/carDetails', car.id])
	}

	public doApplyFilter() {
		let brand = this.filterCarModel.brand;
		let brand1 = this.Selectedbrand;

		let modal = this.filterCarModel.modal;
		let registration_year = this.filterCarModel.registration_year;
		let kms = this.filterCarModel.kms_driven;
		let budget = this.filterCarModel.budget;
		let body_type = this.filterCarModel.body_type;
		let variant = this.filterCarModel.variant
		if (!brand && !modal && !registration_year && !kms && !budget && !body_type && !variant) {
			this.toastr.warning('Please select at least 1 filter !', 'warning!');
			return;
		}
		this.service.GetAllCarss(brand, modal, registration_year, kms, budget, body_type, variant).then(res => {
			if (res.status) {
				this.carsDataList = res.data;
				if (this.carsDataList.length <= 0)
					this.toastr.info("We Don't have any cars", 'Info!');
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		})
	}
}
