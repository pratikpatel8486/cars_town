import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CarsService } from 'src/Shared/Services/cars.service';
import { CommonService } from 'src/Shared/Services/common.service';
import { SessionStore } from 'src/Shared/Util/SessionStore';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  fuelTypeList: any;
  ownershipList: any;
  RTOList: any;
  transmissionList: any;
  insuranceList: any;
  filterRegistrationYear: any;
  filterKMSDriven: any;
  filterBudget: any;
  filterBodyType: any;
  brandDataList: any;
  brandModalDataList: any;
  brandVariantDataList: any;
  carsDataList: any;
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

  constructor(private router: Router, public service: CarsService,
    private toastr: ToastrService,
    public commonService: CommonService) {
    if (SessionStore.accessToken == null || SessionStore.accessTokenType == null) {
      this.router.navigate(['/login',])
      return;
    }
  }

  ngOnInit(): void {
    this.preInit();

  }

  async preInit() {
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

  EditCard(CarDetails: any) {
    this.router.navigate(['/edit-cars', CarDetails.id])
  }

}
