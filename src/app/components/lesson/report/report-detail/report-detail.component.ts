import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReportResponses } from 'src/app/responses/report/report.responses';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnChanges, OnInit {
  @Input() report: ReportResponses | undefined;
  imageUrl: string = '';
  selectedStatus: string = '';

  reportDetailForm = new FormGroup({
    name: new FormControl(this.sharedService.reportDetail[0]?.userReport),
    lessonName: new FormControl(this.sharedService.reportDetail[0]?.targetId),
    status: new FormControl(this.sharedService.reportDetail[0]?.status),
    description: new FormControl(this.sharedService.reportDetail[0]?.reason),
    image: new FormControl(this.sharedService.reportDetail[0]?.imageUrl)
  });

  private closeResult = '';

  constructor(private modalService: NgbModal, private config: NgbModalConfig, private sharedService: SharedService, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Xử lý các thay đổi của input nếu cần
  }

  ngOnInit() {
    if (this.sharedService.reportDetail && this.sharedService.reportDetail.length > 0) {
      this.report = this.sharedService.reportDetail[0];
      this.imageUrl = this.sharedService.reportDetail[0]?.imageUrl;
      this.selectedStatus = this.sharedService.reportDetail[0]?.status;
      console.log(this.report.imageUrl);
    }
  }

  openEdit(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg', scrollable: true})
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  openConfirmSave(file: any) {
    // Implement logic for confirming save
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
