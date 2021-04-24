import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute) {
    // this.errorMessage = this.activatedRoute.snapshot.data['message'];
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.errorMessage = data.message;
      }
    );
  }
  ngOnInit(): void {
  }

}
