import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from 'src/Shared/Services/cars.service';
@Component({
	selector: 'app-brands',
	templateUrl: './brands.component.html',
	styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

	constructor(
		public service: CarsService,
		private toastr: ToastrService
	) { }

	public brandDataList: any[] = [];

	ngOnInit(): void {
		this.getAllBrand();
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

}
