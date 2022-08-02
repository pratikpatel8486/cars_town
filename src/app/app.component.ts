import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalStateService } from 'src/Shared/Services/global-state.service';
import { SessionStore } from 'src/Shared/Util/SessionStore';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private router: Router, private _GlobalStateService: GlobalStateService, private toastr: ToastrService,) {

	}
	isShow: boolean | undefined;
	topPosToStartShowing = 150;
	public isViewLogOut = false;
	public navMenu: any = 'home';

	@HostListener('window:scroll')
	checkScroll() {
		const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		// console.log('[scroll]', scrollPosition);
		if (scrollPosition >= this.topPosToStartShowing) {
			this.isShow = true;
		} else {
			this.isShow = false;
		}
	}
	gotoTop() {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}
	title = 'carsTown';

	ngOnInit(): void {
		if (SessionStore.accessToken) {
			this.isViewLogOut = true
		}
		this._GlobalStateService.unsubscribe('CALLED_AS_LOG_OUT');
		this._GlobalStateService.subscribe('CALLED_AS_LOG_OUT', (response: { isDefault: any; }) => {
			if (response) {
				if (response.isDefault) {
					if (SessionStore.accessToken) {
						this.isViewLogOut = true
					}
				}
			}
		});
	}

	doClickLogOut() {
		SessionStore.accessToken = '';
		SessionStore.accessTokenType = '';
		this.isViewLogOut = false;
		this.toastr.success('Logout successfully !!', 'Success!');
		this.router.navigate(['/'])
	}

	ngOnDestroy(): void {
		this._GlobalStateService.unsubscribe('CALLED_AS_LOG_OUT');
	}

	doMenuClick(menu: any) {
		this.Menutoggle()
		this.navMenu = menu;
	}
	Menutoggle() {
		$('#navbarTogglerDemo02').toggleClass('show')
		$('#NavbarHeader').toggleClass('collapsed')
	}
}
