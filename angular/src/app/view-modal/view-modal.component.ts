import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.css']
})
export class ViewModalComponent {

  title: string | null = "My title";
  body = "..."

  constructor(public modalRef: MdbModalRef<ViewModalComponent>) {}

}
