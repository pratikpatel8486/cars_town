import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandModalModel, BrandModel, BrandVariantModel, CarModel } from 'src/app/model/cars.model';
import { CarsService } from 'src/Shared/Services/cars.service';
import { CommonService } from 'src/Shared/Services/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

// import { fileDialog } from 'file-dialog'
@Component({
	selector: 'app-add-cars',
	templateUrl: './add-cars.component.html',
	styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent implements OnInit {
	@ViewChild('btnCloseBrandModal') btnCloseBrandModal: any;
	@ViewChild('btnCloseModal') btnCloseModal: any;
	@ViewChild('btnCloseVraientModal') btnCloseVraientModal: any;
	Logo: any;

	constructor(
		public service: CarsService,
		public commonService: CommonService,
		private toastr: ToastrService,
		private route: ActivatedRoute,
		private http: HttpClient,
		protected sanitizer: DomSanitizer
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
	public carImagefiles: File[] = [];
	public fuelTypeList: any[] = [];
	public ownershipList: any[] = [];
	public RTOList: any[] = [];
	public transmissionList: any[] = [];
	public insuranceList: any[] = [];
	public carID: any;
	SelectedBrandModal: any[] = [];
	SelectedModal: any[] = [];
	SelectedBrandModalForAddCars: any[] = [];

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
		this.route.params.subscribe(params => {
			this.carID = +params['id'];
		});

		if (this.carID) {
			this.getCar();
		}
	}

	async getCar() {
		await this.service.GetCar(this.carID).then(res => {
			if (res.status) {
				this.carModel = res.data;
				this.SelectedModal = this.brandVariantDataList.filter(x => x.model_id == this.carModel.modal && x.brand_id == this.carModel.brand)
				this.SelectedBrandModalForAddCars = this.brandModalDataList.filter(x => x.brand_id == this.carModel.brand)

				this.carImagefiles = [];
				const images: any = res.data.images || [];
				if (images && images.length > 0) {
					images.forEach((elementURL: any) => {
						// 	this.getBase64ImageFromUrl(elementURL).then((result: any) => {
						// 		const imgArr = elementURL.split('/');
						// 		const fileImage = new File([result], imgArr[imgArr.length - 1], { type: 'image/png' });
						// 		this.carImagefiles.push(fileImage);
						// 		//this.carImagefiles.push(result)
						// 	}).catch((err: any) => console.error(err));
						// this.http
						// 	.get(
						// 		elementURL,
						// 		{ responseType: 'blob' },
						// 	)
						// 	.pipe(switchMap((blob: Blob) => this.convertBlobToBase64(blob)))
						// 	.subscribe((base64ImageUrl: any) => {
						// 		const imgArr = elementURL.split('/');
						// 		const fileImage = new File([base64ImageUrl], imgArr[imgArr.length - 1], { type: 'image/png' });
						// 		this.carImagefiles.push(fileImage);
						// 	});
						this.http.get(elementURL, { responseType: 'blob' })
							.pipe(switchMap((blob: Blob) => this.convertBlobToBase64(blob, elementURL)))
							.subscribe((base64ImageUrl: any) => {
								const imgArr = elementURL.split('/');
								const imageFile: any = new File([base64ImageUrl], imgArr[imgArr.length - 1], { type: 'image/jpeg' });
								// let imageArray: any = [];
								// imageArray.push(imageFile)
								this.carImagefiles.push(imageFile);
							});
					});

				}

				const insuranceDate = new DatePipe('en-US').transform(res.data.insurance_date, 'yyyy-MM-dd')
				this.carModel.insurance_date = insuranceDate;
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		})

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
				this.btnCloseBrandModal.nativeElement.click();
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
		await this.service.addNewBrandModel(formData).then(res => {
			if (res.status) {
				this.brandModel = new BrandModalModel();
				this.toastr.success(res.message, 'Success!');
				this.btnCloseModal.nativeElement.click();
				this.getAllBrandModel();
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
				this.toastr.success(res.message, 'Success!');
				this.btnCloseVraientModal.nativeElement.click();
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

			let reader = new FileReader();

			reader.onload = (event: any) => {
				this.Logo = event.target.result;
			}
			reader.readAsDataURL(files[0]);
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
		// if (this.carImagefiles && this.carImagefiles.length > 0) {
		// 	for (let i = 0; i < this.carImagefiles.length; i++) {
		// 		formDataImages.append(i.toString(), this.carImagefiles[i]);
		// 		imageFiles.push(formDataImages.getAll(i.toString()));
		// 	}
		// }
		for (let file of this.carImagefiles) {
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
				this.carImagefiles = [];
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
		if (!this.carImagefiles) {
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
		this.carImagefiles.push(...event.addedFiles);
	}

	onRemoveImage(event: any) {
		console.log(event);
		this.carImagefiles.splice(this.carImagefiles.indexOf(event), 1);
	}


	convertBlobToBase64(blob: Blob, elementURL: any) {
		return Observable.create((observer: any) => {
			const reader = new FileReader();
			const binaryString = reader.readAsDataURL(blob);
			reader.onload = (event: any) => {
				console.log('Image in Base64: ', event.target.result);
				// const imgArr = elementURL.split('/');
				// const imageName = imgArr[imgArr.length - 1];
				// const imageBlob = this.dataURItoBlob(event.target.result.toString());
				// const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
				observer.next(event.target.result.toString());
				observer.complete();
			};

			reader.onerror = (event: any) => {
				console.log('File could not be read: ' + event.target.error.code);
				observer.next(event.target.error.code);
				observer.complete();
			};
		});
	}

	dataURItoBlob(dataURI: any) {
		const byteString = atob(dataURI);
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const int8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			int8Array[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([int8Array], { type: 'image/png' });
		return blob;
	}
	//#endregion


	SelectBrand(event: any, IsFromAddCar: boolean) {
		const brandid = event.target.value
		if (IsFromAddCar) {
			if (brandid == "") {
				this.SelectedBrandModal = [];
				return;
			}
			this.SelectedBrandModal = this.brandModalDataList.filter(x => x.brand_id == brandid)
		}
		else {
			if (brandid == "") {
				this.SelectedBrandModalForAddCars = [];
				return;
			}
			this.SelectedBrandModalForAddCars = this.brandModalDataList.filter(x => x.brand_id == brandid)
		}
	}

	SelectModal(event: any) {
		const Modalid = event.target.value
		if (Modalid == "") {
			this.brandVariantDataList = [];
			return;
		}
		this.SelectedModal = this.brandVariantDataList.filter(x => x.model_id == Modalid && x.brand_id == this.carModel.brand)
	}

	RemoveBrandImg() {
		this.documentFileData = null
		this.brandModel.image = '';
		this.Logo = null
	}



}
