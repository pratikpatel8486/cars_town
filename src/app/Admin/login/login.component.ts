import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from 'src/Shared/Services/cars.service';
import { SessionStore } from 'src/Shared/Util/SessionStore';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public email: string = 'mitul@gmail.com';
	public password: string = 'test@123';
	constructor(
		public service: CarsService,
		private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit(): void {
	}

	async onSubmit() {
		if (!this.email) {
			this.toastr.info('Email is required !', 'Info!');
			return;
		}
		if (!this.password) {
			this.toastr.info('Password is required !', 'Info!');
			return;
		}
		const bodyObj: any = {
			email: this.email,
			password: this.password
		}
		await this.service.UserLogin(bodyObj).then(res => {
			if (res.success) {
				SessionStore.accessToken = res.token;
				SessionStore.accessTokenType = res.type;
				this.toastr.success(res.message, 'Success!');
				this.router.navigate(['/add-cars'])
			} else {
				this.toastr.error(res.message, 'Error!');
			}
		});
	}
}
