import { Component, OnInit } from '@angular/core';
import fileDialog from 'file-dialog'

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  uploadPhoto() {
    fileDialog({multiple: true, accept: 'image/*'})
    .then((files: any) => console.log(files))
    // .then(() => {
    //     this.utilService.notify('Images uploaded successfully.</br>They will be displayed here shortly.');
    //     setTimeout(() => {
    //         if (this.albumCreate) {
    //             this.getUploadedImagesNewAlbum();
    //         } else {
    //             this.getUploadedImages();
    //         }
    //     }, 4000);
    // }).catch();
  }

}
