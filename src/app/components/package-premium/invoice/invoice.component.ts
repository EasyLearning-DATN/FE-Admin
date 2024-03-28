import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceResponses } from 'src/app/responses/invoice/invoice.responses';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { QuestionTypeResponses } from 'src/app/responses/question-type/question-type.responses';
import { QuestionResponses } from 'src/app/responses/question/question.responses';
import { LessonService } from 'src/app/services/lesson.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { InvoiceService } from 'src/app/services/upgrade/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  isFetching = false;
  invoices: InvoiceResponses[] = [];
  error = null;


  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    this.fetchInvoice();
  }


  private fetchInvoice() {
    this.isFetching = true;
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.invoiceService.GetAllInvoice().subscribe(
      (res) => {
      Swal.close();
      this.isFetching = false;
      this.invoices = res.data.data;
      console.log(this.invoices); 
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(this.error);
    });
  }

}
