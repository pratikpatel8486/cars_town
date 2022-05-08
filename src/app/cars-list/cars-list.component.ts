import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { OwlOptions } from 'ngx-owl-carousel-o';

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

  constructor() { }

  ngOnInit(): void {
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
  }
}
