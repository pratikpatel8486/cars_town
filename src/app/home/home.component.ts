import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public car_brand: Array<Select2OptionData> = [];
  public body_type: Array<Select2OptionData> = [];
  public car_modal: Array<Select2OptionData> = [];
  public car_year: Array<Select2OptionData> = [];
  public options: any;
  // items: any = ['Bold', 'Italic', 'Underline', 'Formats', 'Alignments', 'fontColor']
 
  constructor() { }

  ngOnInit(): void { 

    this.body_type = [
      {
        id: 'sedan',
        text: 'Sedan'
      },
      {
        id: 'hatchback',
        text: 'Hatchback'
      },
      {
        id: 'suv',
        text: 'SUV'
      },
      {
        id: 'limousine',
        text: 'Limousine'
      },
      {
        id: 'micro',
        text: 'Micro'
      },
    ]
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
    this.car_modal = [
      {
        id: 'model01',
        text: 'Model 01'
      },
      {
        id: 'model02',
        text: 'Model 02'
      },
      {
        id: 'model03',
        text: 'Model 03'
      },
      {
        id: 'model04',
        text: 'Model 04'
      }
    ];
    this.car_year = [
      {
        id: '2018',
        text: '2018'
      },
      {
        id: '2019',
        text: '2019'
      },
      {
        id: '2020',
        text: '2020'
      },
      {
        id: '2021',
        text: '2021'
      }
    ]
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false
    }
  }

}
