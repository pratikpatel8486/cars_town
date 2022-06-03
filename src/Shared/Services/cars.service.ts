import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { endpoint } from '../Util/APIEndPoint';
import { SessionStore } from '../Util/SessionStore';
import { ApiProvider } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class CarsService {

	constructor(public api: ApiProvider) { }

	/* #region  Request Type */

	/**
	 * Request option of API
	 * @returns {RequestOptions}
	 */
	async getRequestOptions(): Promise<{ headers?: HttpHeaders, params?: HttpParams, responseType?: any }> {

		let options: { headers?: HttpHeaders, params?: HttpParams, responseType?: any } = {};
		options.headers = new HttpHeaders()
			.append("Authorization", await SessionStore.accessTokenType + " " + await SessionStore.accessToken)
		//.append("Authorization", "")

		return options;
	}

	/**
	* call get request
	* @param {string} endpoint
	* @returns {Observable<ArrayBuffer>}
	*/
	async get<T>(endpoint: string) {
		let options = await this.getRequestOptions();
		return this.api.get<T>(endpoint, options).toPromise()
			.catch(err => {
				if (err.status == 503) {
					// this.app.getActiveNav().setRoot(SiteundermaintenancePage);
				}
			});
	}

	/**
	* call get request
	* @param {string} endpoint
	* @returns {Observable<ArrayBuffer>}
	*/
	async put<T>(endpoint: string) {
		let options = await this.getRequestOptions();
		return this.api.put<T>(endpoint, options).toPromise()
			.catch(err => {
				if (err.status == 503) {
					// this.app.getActiveNav().setRoot(SiteundermaintenancePage);
				}
			});
	}

	/**
	* call post request
	* @param {string} endpoint
	* @param body
	* @returns {Observable<ArrayBuffer>}
	*/
	async post<T>(endpoint: string, body?: any) {
		let options = await this.getRequestOptions();
		return this.api.post<T>(endpoint, body, options).toPromise()
			.catch(err => {
				if (err.status == 503) {
					// this.app.getActiveNav().setRoot(SiteundermaintenancePage);
				}
			});
	}

	async delete<T>(endpoint: string) {
		let options = await this.getRequestOptions();
		return this.api.delete<T>(endpoint, options).toPromise()
			.catch(err => {
				if (err.status == 503) {
					// this.app.getActiveNav().setRoot(SiteundermaintenancePage);
				}
			});
	}
	/* #endregion */

	/* #region  Authentication */

	async UserLogin(body: any): Promise<any> {
		return this.post<any>(endpoint.USER_LOGIN, body);
	}

	async Registation(body: any): Promise<any> {
		return this.post<any>(endpoint.USER_REGITER, body);
	}

	/* #endregion */

	/* #region  Cars */

	async AddNewCar(body: any): Promise<any> {
		return this.post<any>(endpoint.ADD_CAR, body);
	}

	async UpdateCar(body: any): Promise<any> {
		return this.post<any>(endpoint.UPDATE_CAR, body);
	}

	async GetCar(ID: any): Promise<any> {
		return this.get<any>(endpoint.GET_CAR + ID);
	}

	async GetAllCarss(brand: string, modal: string, registration_year: string, kms: string, budget: string, boday_type: string): Promise<any> {
		return this.get<any>(endpoint.GET_ALL_CAR + "brand=" + brand + "&modal=" + modal + "&registration_year=" + registration_year + "&kms=" + kms + "&budget=" + budget + "&body_type=" + budget);
	}

	async GetAllCarssData(): Promise<any> {
		return this.get<any>(endpoint.GET_ALL_CAR);
	}

	async DeleteCars(ID: any): Promise<any> {
		return this.delete<any>(endpoint.DELETE_CAR + ID);
	}

	async GetLatestCars(): Promise<any> {
		return this.get<any>(endpoint.GET_LATEST_CAR);
	}
	/* #endregion */


	/* #region  Brad Module */

	async addNewBrand(body: any): Promise<any> {
		return this.post<any>(endpoint.ADD_BRAND, body);
	}

	async UpdateBrand(body: any): Promise<any> {
		return this.put<any>(endpoint.UPDATE_BRAND + body);
	}

	async GetBrand(ID: any): Promise<any> {
		return this.get<any>(endpoint.GET_BRAND + ID);
	}

	//   async GetAllBrand(ID: any): Promise<any> {
	//     return this.get<any>(endpoint.GET_ALL_BRAND + ID);
	//   }

	async GetAllBrand(): Promise<any> {
		return this.get<any>(endpoint.GET_ALL_BRAND);
	}

	async DeleteBrand(ID: any): Promise<any> {
		return this.delete<any>(endpoint.DELETE_BRAND + ID);
	}
	/* #endregion */


	/* #region  Brad Modal Module */

	async addNewBrandModel(body: any): Promise<any> {
		return this.post<any>(endpoint.ADD_BRAND_MODEL, body);
	}

	async UpdateBrandModel(body: any): Promise<any> {
		return this.put<any>(endpoint.UPDATE_BRAND_MODEL + body);
	}

	async GetBrandmodel(ID: any): Promise<any> {
		return this.get<any>(endpoint.GET_BRAND_MODEL + ID);
	}

	async GetAllBrandModel(): Promise<any> {
		return this.get<any>(endpoint.GET_ALL_BRAND_MODEL);
	}

	async DeleteBrandModel(ID: any): Promise<any> {
		return this.delete<any>(endpoint.DELETE_BRAND_MODEL + ID);
	}
	/* #endregion */

	/* #region  Brad Modal Module */

	async addNewBrandVariant(body: any): Promise<any> {
		return this.post<any>(endpoint.ADD_BRAND_VARIANT, body);
	}

	async UpdateBrandVariant(body: any): Promise<any> {
		return this.put<any>(endpoint.UPDATE_BRAND_VARIANT + body);
	}

	async GetBrandVariant(ID: any): Promise<any> {
		return this.get<any>(endpoint.GET_BRAND_VARIANT + ID);
	}

	async GetAllBrandVariant(): Promise<any> {
		return this.get<any>(endpoint.GET_ALL_BRAND_VARIANT);
	}

	async DeleteBrandVariant(ID: any): Promise<any> {
		return this.delete<any>(endpoint.DELETE_BRAND_VARIANT + ID);
	}
	/* #endregion */
}
