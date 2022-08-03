import { FilterCarModel } from './../model/cars.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from 'src/Shared/Services/cars.service';
import { CommonService } from 'src/Shared/Services/common.service';

declare var $: any;

@Component({
	selector: 'app-cars-list',
	templateUrl: './cars-list.component.html',
	styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
	public car_brand: Array<Select2OptionData> = [];
	public brandDataList: any[] = [];
	public brandModalDataList: any[] = [];
	public brandVariantDataList: any[] = [];
	public fuelTypeList: any[] = [];
	public ownershipList: any[] = [];
	public RTOList: any[] = [];
	public transmissionList: any[] = [];
	public insuranceList: any[] = [];
	public filterCarModel: FilterCarModel = new FilterCarModel();
	public filterRegistrationYear: any[] = [];
	public filterKMSDriven: any[] = [];
	public filterBudget: any[] = [];
	public filterBodyType: any[] = [];
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
	public carsDataList: any[] = [];
	constructor
		(public service: CarsService,
			private toastr: ToastrService,
			public commonService: CommonService,
			private router: Router) { }

	//   async ngOnInit() {
	//     this.car_brand = [
	//       {
	//         id: 'hyundai',F
	//         text: 'Hyundai'
	//       },
	//       {
	//         id: 'Tata_motors',
	//         text: 'Tata Motors'
	//       },
	//       {
	//         id: 'kia',
	//         text: 'Kia'
	//       },
	//       {
	//         id: 'toyota',
	//         text: 'Toyota'
	//       }
	//     ];
	//     let brand = "1"
	//     let modal = "1"
	//     let registration_year = "Above 2015"
	//     let kms = "Below 20K"
	//     let budget = "Below 3L"
	//     await this.service.GetAllCarss(brand, modal, registration_year, kms, budget).then(res => {
	//       if (res.status) {

	//       }
	//     })
	//   }

	ngOnInit(): void {
		this.preInit();
	}

	async preInit() {
		this.getAllBrand();
		this.getAllBrandModel();
		this.getAllBrandVariant();
		this.fuelTypeList = this.commonService.fuelTypeList;
		this.ownershipList = this.commonService.ownershipList;
		this.RTOList = this.commonService.RTOList;
		this.transmissionList = this.commonService.transmissionList;
		this.insuranceList = this.commonService.insuranceList;
		this.filterRegistrationYear = this.commonService.filterRegistrationYear;
		this.filterKMSDriven = this.commonService.filterKMSDriven;
		this.filterBudget = this.commonService.filterBudget;
		this.filterBodyType = this.commonService.filterBodyType;
		this.getAllCars()
	}

	public doClickCarDetails(car: any) {
		this.router.navigate(['/carDetails', car.id])
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

	async getAllCars() {
		await this.service.GetAllCarssData
			().then(res => {
				if (res.status) {
					this.carsDataList = res.data;
				} else {
					this.toastr.error(res.message, 'Error!');
				}
			})

	}

	public doApplyFilter() {
		let brand = this.filterCarModel.brand;
		let modal = this.filterCarModel.modal;
		let registration_year = this.filterCarModel.registration_year;
		let kms = this.filterCarModel.kms_driven;
		let budget = this.filterCarModel.budget;
		let body_type = this.filterCarModel.body_type;
		if (!brand && !modal && !registration_year && !kms && !budget && !body_type) {
			this.toastr.info('Please select at least 1 filter !', 'Info!');
			return;
		}
		this.service.GetAllCarss(brand, modal, registration_year, kms, budget, body_type).then(res => {
			if (res.status) {
				this.carsDataList = res.data;
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		})
	}

	public doClickResetFilter() {
		this.filterCarModel = new FilterCarModel();
		this.getAllCars();
	}
}
