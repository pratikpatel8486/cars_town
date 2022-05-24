import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarsService } from 'src/Shared/Services/cars.service';

declare var $: any;

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
  public car_brand: Array<Select2OptionData> = [];

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

  constructor(public service: CarsService) { }

  async ngOnInit() {
    this.car_brand = [
      {
        id: 'hyundai',
        text: 'Hyundai'
      },
      {
        id: 'Tata_motors',
        text: 'Tata Motors'
      },
      {
        id: 'kia',
        text: 'Kia'
      },
      {
        id: 'toyota',
        text: 'Toyota'
      }
    ];
    let brand = "1"
    let modal = "1"
    let registration_year = "Above 2015"
    let kms = "Below 20K"
    let budget = "Below 3L"
    await this.service.GetAllCarss(brand, modal, registration_year, kms, budget).then(res => {
      if (res.status) {

      }
    })
  }
}
