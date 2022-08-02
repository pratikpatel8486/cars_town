
export class FilterCarModel {
	public registration_year: string;
	public kms_driven: string;
	public budget: string;
	public body_type: string;
	public brand: string;
	public modal: string;
	public variant: string;
	constructor() {
		this.registration_year = '';
		this.kms_driven = '';
		this.budget = '';
		this.body_type = '';
		this.brand = '';
		this.modal = '';
		this.variant = '';
	}
}
export class BrandModel {
	public id?: number;
	public brand?: string;
	public image?: string;
	constructor() {
		this.brand = '';
	}
}
export class BrandModalModel {
	public id?: number;
	public brand_id: string;
	public brand_modal: string;
	constructor() {
		this.brand_id = '';
		this.brand_modal = '';
	}
}
export class BrandVariantModel {
	public id?: number;
	public brand_id: string;
	public model_id: string;
	public brand_variant?: string;
	constructor() {
		this.brand_id = '';
		this.model_id = '';
		this.brand_variant = '';
	}
}

export class CarModel {
	public id?: number;
	public brand: string;
	public modal: string;
	public variant: string;
	public make_year: string;
	public reg_year: string;
	public fuel_type: string;
	public ownership: string;
	public kms: string;
	public rto: string;
	public transmission: string;
	public insurance: string;
	public insurance_date: any;
	public color: string;
	public images: any;
	public price: any;
	public body_type: any;
	constructor() {
		this.brand = '';
		this.modal = '';
		this.variant = '';
		this.make_year = '';
		this.reg_year = '';
		this.fuel_type = '';
		this.ownership = '';
		this.kms = '';
		this.rto = '';
		this.transmission = '';
		this.insurance = '';
		this.insurance_date = '';
		this.color = '';
		this.images = [];
		this.price = '';
		this.body_type = '';
	}
}

