import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiProvider } from './api.service';
import { CarsService } from './cars.service';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	public brandDataList: any[] = [];
	// public brandModalDataList: any[] = [];
	// public brandVariantDataList: any[] = [];

	public fuelTypeList: any =
		[
			{ value: 'diesel', text: 'Diesel' },
			{ value: 'petrol', text: 'Petrol' },
			{ value: 'cng', text: 'CNG' },
			{ value: 'electric', text: 'Electric' }
		];
	public ownershipList: any =
		[
			{ value: '1', text: '1st' },
			{ value: '2', text: '2nd' },
			{ value: '3', text: '3rd' },
			{ value: '4', text: '4th' },
			{ value: '5', text: '5th' },
			{ value: '6', text: '6th' },
		];
	public RTOList: any =
		[
			{ value: '1', text: 'GJ 01' },
			{ value: '2', text: 'GJ 02' },
			{ value: '3', text: 'GJ 03' },
			{ value: '4', text: 'GJ 04' },
			{ value: '5', text: 'GJ 05' },
		];
	public transmissionList: any =
		[
			{ value: 'manual', text: 'Manual' },
			{ value: 'automatic', text: 'Automatic' },
			{ value: 'hybrid', text: 'Hybrid' },
		];
	public insuranceList: any =
		[
			{ value: 'comprehensive', text: 'Comprehensive' },
			{ value: 'third_party_liability_only_cover', text: 'Third-Party Liability Only Cover' },
			{ value: 'zero_depreciation', text: 'Zero Depreciation' },
		];

	public filterRegistrationYear: any =
		[
			{ value: '2010-2015', text: '2010-2015' },
			{ value: '2015-2020', text: '2015-2020' },
			{ value: 'Above 2020', text: 'Above 2020' },
			{ value: 'All', text: 'All' }
		];
	public filterKMSDriven: any =
		[
			{ value: 'Below 20km', text: 'Below 20km' },
			{ value: '20k-50km', text: '20k-50km' },
			{ value: '50k-70km', text: '50k-70km' },
			{ value: '70k-100km', text: '70k-100km' },
			{ value: 'Above 100km', text: 'Above 100km' }
		];
	public filterBudget: any =
		[
			{ value: 'Below 3L', text: 'Below 3L' },
			{ value: '3L-5L', text: '3L-5L' },
			{ value: '5L-10L', text: '5L-10L' },
			{ value: '10L-20L', text: '10L-20L' },
			{ value: '20L-50L', text: '20L-50L' },
			{ value: '5L-1Cr.', text: '5L-1Cr.' },
			{ value: 'Above 1 Cr.', text: 'Above 1 Cr.' },
		];
	public filterBodyType: any =
		[
			{ value: 'Hatchback', text: 'Hatchback' },
			{ value: 'Sedan', text: 'Sedan' },
			{ value: 'MUV/MPV', text: 'MUV/MPV' },
			{ value: 'SUV', text: 'SUV' },
			{ value: 'Coupe', text: 'Coupe' },
			{ value: 'Convertible', text: 'Convertible' },
		];
	constructor(public api: ApiProvider, public service: CarsService, private toastr: ToastrService) { }

	getAllBrand(): any {
		this.service.GetAllBrand().then(res => {
			if (res.status) {
				return res.data;
			} else {
				this.toastr.error(res.message, 'Error!');
				return [];
			}
		})

	}

	getAllBrandModel(): any {
		this.service.GetAllBrandModel().then(res => {
			if (res.status) {
				return res.data;
			} else {
				this.toastr.error(res.message, 'Error!');
				return [];
			}
		})

	}

	getAllBrandVariant(): any {
		this.service.GetAllBrandVariant().then(res => {
			if (res.status) {
				return res.data;
			} else {
				this.toastr.error(res.message, 'Error!');
				return [];
			}
		})

	}

}
