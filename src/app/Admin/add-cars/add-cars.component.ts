import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandModalModel, BrandModel, BrandVariantModel, CarModel } from 'src/app/model/cars.model';
import { CarsService } from 'src/Shared/Services/cars.service';
import { CommonService } from 'src/Shared/Services/common.service';
// import { fileDialog } from 'file-dialog'
@Component({
	selector: 'app-add-cars',
	templateUrl: './add-cars.component.html',
	styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent implements OnInit {

	constructor(
		public service: CarsService,
		public commonService: CommonService,
		private toastr: ToastrService
	) { }
	public listOfYears: any[] = [];
	public brandDataList: any[] = [];
	public brandModalDataList: any[] = [];
	public brandVariantDataList: any[] = [];
	public documentFileData: any;
	public brandModel: BrandModel = new BrandModel();
	public brandModalModel: BrandModalModel = new BrandModalModel();
	public brandVariantModel: BrandVariantModel = new BrandVariantModel();
	public carModel: CarModel = new CarModel();
	public isBrandDialogView: boolean = false;
	public isBrandModelDialogView: boolean = false;
	public isVariantDialogView: boolean = false;
	public careImagefiles: File[] = [];
	public fuelTypeList: any[] = [];
	public ownershipList: any[] = [];
	public RTOList: any[] = [];
	public transmissionList: any[] = [];
	public insuranceList: any[] = [];

	ngOnInit(): void {
		this.getAllBrand();
		this.getAllBrandModel();
		this.getAllBrandVariant();
		this.listOfYears = this.getYearList();
		this.fuelTypeList = this.commonService.fuelTypeList;
		this.ownershipList = this.commonService.ownershipList;
		this.RTOList = this.commonService.RTOList;
		this.transmissionList = this.commonService.transmissionList;
		this.insuranceList = this.commonService.insuranceList;
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

	async doClickAddBrand() {

		if (!this.brandModel.brand) {
			this.toastr.info('Brand name is required !', 'Info!');
			return;
		}
		if (!this.brandModel.image) {
			this.toastr.info('Image is required !', 'Info!');
			return;
		}

		const formData = new FormData();
		formData.append('brand', this.brandModel.brand);
		formData.append('image', this.documentFileData);
		await this.service.addNewBrand(formData).then(res => {
			if (res.status) {
				this.toastr.success(res.message, 'Success!');
				this.isBrandDialogView = true;
				this.getAllBrand();
				this.brandModel = new BrandModel();
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		});

	}

	async doClickAddBrandModel() {
		if (!this.brandModalModel.brand_id) {
			this.toastr.info('Brand is required !', 'Info!');
			return;
		}
		if (!this.brandModalModel.brand_modal) {
			this.toastr.info('Brand Modal name is required !', 'Info!');
			return;
		}

		const formData = new FormData();
		formData.append('brand_id', this.brandModalModel.brand_id);
		formData.append('brand_modal', this.brandModalModel.brand_modal);
		await this.service.addNewBrandVariant(formData).then(res => {
			if (res.status) {
				this.isBrandModelDialogView = true;
				this.toastr.success(res.message, 'Success!');
				this.getAllBrandModel();
				this.brandModel = new BrandModalModel();
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		});

	}

	async doClickAddBrandVariant() {
		if (!this.brandVariantModel.brand_id) {
			this.toastr.info('Brand is required !', 'Info!');
			return;
		}
		if (!this.brandVariantModel.model_id) {
			this.toastr.info('Model is required !', 'Info!');
			return;
		}
		if (!this.brandVariantModel.brand_variant) {
			this.toastr.info('Brand Variant name is required !', 'Info!');
			return;
		}

		const formData = new FormData();
		formData.append('brand_id', this.brandVariantModel.brand_id);
		formData.append('model_id', this.brandVariantModel.model_id);
		formData.append('brand_variant', this.brandVariantModel.brand_variant);
		await this.service.addNewBrandVariant(formData).then(res => {
			if (res.status) {
				this.isVariantDialogView = true;
				this.toastr.success(res.message, 'Success!');
				this.getAllBrandVariant();
				this.brandVariantModel = new BrandVariantModel();
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		});

	}

	uploadBrandPhoto(event: Event) {
		let files: any = (event.target as HTMLInputElement).files;
		if (files.length === 1) {
			// file type verify
			const fileType = files[0].type;
			if (fileType !== '.png' && fileType !== '.jepg' && fileType !== '.jpg' && fileType !== 'image/png' && fileType !== 'image/gif' && fileType !== 'image/jpeg') {
				this.toastr.info('File extension not valid', 'Info!', { closeButton: true, tapToDismiss: true });
				this.brandModel.image = '';
				return;
			}
			// file size convert KB
			const fileSize = Math.round(files[0].size / 5120);
			if (fileSize > 5120) {
				this.toastr.info('File size should not greater then 5 MB', 'Info!', { closeButton: true, tapToDismiss: true });
				return;
			}
			this.documentFileData = files[0];
			this.brandModel.image = files[0].name;
			// this._FileUploadService.upload(files);
		}
	}

	private getYearList() {
		const year = new Date().getFullYear();
		const range = [];
		range.push(year);
		for (let i = 1; i < 15; i++) {
			range.push(year - i);
		}
		return range;
	}

	async addCarDetails() {
		if (!this.checkValidation()) {
			return;
		}
		const formData: any = new FormData();
		// const formDataImages = new FormData();
		// const imageFiles: any[] = [];
		// if (this.careImagefiles && this.careImagefiles.length > 0) {
		// 	for (let i = 0; i < this.careImagefiles.length; i++) {
		// 		formDataImages.append(i.toString(), this.careImagefiles[i]);
		// 		imageFiles.push(formDataImages.getAll(i.toString()));
		// 	}
		// }
		for (let file of this.careImagefiles) {
			formData.append('images[]', file);
		}

		formData.append('brand', this.carModel.brand);
		formData.append('modal', this.carModel.modal);
		formData.append('variant', this.carModel.variant);
		formData.append('make_year', this.carModel.make_year);
		formData.append('reg_year', this.carModel.reg_year);
		formData.append('fuel_type', this.carModel.fuel_type);
		formData.append('ownership', this.carModel.ownership);
		formData.append('kms', this.carModel.kms);
		formData.append('rto', this.carModel.rto);
		formData.append('transmission', this.carModel.transmission);
		formData.append('insurance', this.carModel.insurance);
		formData.append('insurance_date', this.carModel.insurance_date);
		formData.append('color', this.carModel.color);
		formData.append('price', this.carModel.price);
		formData.append('body_type', this.carModel.body_type);
		await this.service.AddNewCar(formData).then(res => {
			if (res.status) {
				this.toastr.success(res.message, 'Success!');
				this.carModel = new CarModel();
				this.careImagefiles = [];
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		});

	}

	public checkValidation(): boolean {
		if (!this.carModel.brand) {
			this.toastr.info('Brand is required !', 'Info!');
			return false;
		}
		if (!this.carModel.modal) {
			this.toastr.info('Model is required !', 'Info!');
			return false;
		}
		if (!this.carModel.variant) {
			this.toastr.info('Variant is required !', 'Info!');
			return false;
		}
		if (!this.carModel.make_year) {
			this.toastr.info('Make year is required !', 'Info!');
			return false;
		}
		if (!this.carModel.reg_year) {
			this.toastr.info('Reg year is required !', 'Info!');
			return false;
		}
		if (!this.carModel.fuel_type) {
			this.toastr.info('Fuel Type is required !', 'Info!');
			return false;
		}
		if (!this.carModel.ownership) {
			this.toastr.info('Ownership is required !', 'Info!');
			return false;
		}
		if (!this.carModel.kms) {
			this.toastr.info('KMS is required !', 'Info!');
			return false;
		}
		if (!this.carModel.rto) {
			this.toastr.info('RTO is required !', 'Info!');
			return false;
		}
		if (!this.carModel.transmission) {
			this.toastr.info('Transmission is required !', 'Info!');
			return false;
		}
		if (!this.carModel.insurance) {
			this.toastr.info('Insurance is required !', 'Info!');
			return false;
		}
		if (!this.carModel.insurance_date) {
			this.toastr.info('Insurance Date is required !', 'Info!');
			return false;
		}
		if (!this.carModel.color) {
			this.toastr.info('Color is required !', 'Info!');
			return false;
		}
		if (!this.careImagefiles) {
			this.toastr.info('Car Images is required !', 'Info!');
			return false;
		}
		if (!this.carModel.price) {
			this.toastr.info('Price is required !', 'Info!');
			return false;
		}
		if (!this.carModel.modal) {
			this.toastr.info('Body type is required !', 'Info!');
			return false;
		}
		return true;
	}

	//#region  car multiple image upload 
	onSelectImage(event: any) {
		console.log(event);
		this.careImagefiles.push(...event.addedFiles);
	}

	onRemoveImage(event: any) {
		console.log(event);
		this.careImagefiles.splice(this.careImagefiles.indexOf(event), 1);
	}
	//#endregion
}
