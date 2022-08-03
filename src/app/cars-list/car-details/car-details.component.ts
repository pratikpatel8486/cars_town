import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from 'src/Shared/Services/cars.service';
import { CommonService } from 'src/Shared/Services/common.service';

declare var $: any;

@Component({
	selector: 'app-car-details',
	templateUrl: './car-details.component.html',
	styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		autoplay: true,
		touchDrag: true,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			},
			991: {
				items: 3
			}
		},
		nav: true
	};

	latestCollection: OwlOptions = {
		loop: true,
		mouseDrag: true,
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
	public carID: any;
	public carsDetail: any;
	public brandDataList: any[] = [];
	public brandModalDataList: any[] = [];
	public brandVariantDataList: any[] = [];
	public fuelTypeList: any[] = [];
	public ownershipList: any[] = [];
	public RTOList: any[] = [];
	public transmissionList: any[] = [];
	public insuranceList: any[] = [];
	public latestCarsDataList: any[] = [];
	public filterBodyTypeDataList: any[] = [];
	constructor(private route: ActivatedRoute,
		public service: CarsService,
		public commonService: CommonService,
		private toastr: ToastrService,) { }

	async ngOnInit() {
		await this.getAllBrand();
		await this.getAllBrandModel();
		await this.getAllBrandVariant();
		this.fuelTypeList = this.commonService.fuelTypeList;
		this.ownershipList = this.commonService.ownershipList;
		this.RTOList = this.commonService.RTOList;
		this.transmissionList = this.commonService.transmissionList;
		this.insuranceList = this.commonService.insuranceList;
		this.filterBodyTypeDataList = this.commonService.filterBodyType;
		this.route.params.subscribe(params => {
			this.carID = +params['id'];
		});

		if (this.carID) {
			await this.getCar();
			await this.getLatestCars();
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

	async getCar() {
		await this.service.GetCar(this.carID).then(res => {
			if (res.status) {
				this.carsDetail = res.data;
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

}
