import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { FilterCarModel } from 'src/app/model/cars.model';
import { CarsService } from 'src/Shared/Services/cars.service';
import { CommonService } from 'src/Shared/Services/common.service';
import { SessionStore } from 'src/Shared/Util/SessionStore';

declare var $: any;
@Component({
	selector: 'app-car-list',
	templateUrl: './car-list.component.html',
	styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
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
	constructor(public service: CarsService,
		private toastr: ToastrService, public commonService: CommonService,
		private router: Router) {
		if (SessionStore.accessToken == null || SessionStore.accessTokenType == null) {
			this.router.navigate(['/login',])
			return;
		}
	}

	ngOnInit(): void {
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

	public doClickAddCar() {
		this.router.navigate(['/add-cars'])
	}

	public doClickCarDetails(car: any) {
		this.router.navigate(['/edit-cars', car.id])
	}

	public doClickDeleteCar(car: any) {
		if (car.id) {
			this.service.DeleteCars(car.id).then(res => {
				if (res.status) {
					// const carIndex = this.carsDataList.findIndex(i => i.id === car.id);
					// if (carIndex != -1) {
					// 	this.carsDataList.splice(carIndex, 1);
					// }
					this.toastr.success(res.message, 'Success!');
					this.getAllCars();
				} else {
					this.toastr.error(res.message, 'Error!');
				}
			})
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
		let variant = ""
		if (!brand && !modal && !registration_year && !kms && !budget && !body_type) {
			this.toastr.info('Please select at least 1 filter !', 'Info!');
			return;
		}
		this.service.GetAllCarss(brand, modal, registration_year, kms, budget, body_type, variant).then(res => {
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
