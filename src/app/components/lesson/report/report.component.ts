import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Status } from 'src/app/enums/ReportStatus';
import { ReportResponses } from 'src/app/responses/report/report.responses';
import { ReportSResponses } from 'src/app/responses/reports/reports.responses';
import { ReportService } from 'src/app/services/report/report.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent{
  reports: ReportResponses[] = [];
  selectedReport: any;
  @ViewChild('modal') modal: any;
  statusRQ: Status = Status.PENDING;

  constructor(
    private reportService: ReportService,
    private sharedService : SharedService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllReport();
  }

  openModal(report: any) {
    this.selectedReport = report;
    this.modalService.open(this.modal); // Open modal using modal service
  }
  // get all report trong reportService
  getAllReport() {
    const token = localStorage.getItem('token') || '';
    Swal.fire({
      title: 'Đang tải...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.reportService.getAllReport(token).subscribe((reports: ReportSResponses) => {
      this.reports = this.sharedService.reportDetail;
      console.log(this.reports);
      // gán giá trị cho targetId
      this.reports.forEach((report) => {
        this.getInfoLesson(report.targetId);
      });
      Swal.close();
    }, error => {
      console.log(error);
    });
  }

  // get lesson by id được truyền vào từ component
  getInfoLesson(id : any) {
    this.reportService.getInfoLesson(id).subscribe(
      (data) => {
      this.reports.forEach((report) => {
        if (report.targetId == data.data.id) {
          report.targetId = data.data.name;
        }
      });
    });
  }

  onConfirm(reportId: string) {
    const token = localStorage.getItem('token') || '';
    this.statusRQ = Status.RESOLVED;
    console.log(this.statusRQ = Status.RESOLVED);
    Swal.fire({
      title: 'Đang cập nhật...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.reportService.updateReport(reportId, this.statusRQ,token).subscribe(
      (data) => {
        if (data) {
          Swal.fire({
            title: 'Cập nhật thành công!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          window.location.reload();
        } else {
          Swal.fire({
            title: 'Cập nhật thất bại!',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      err => {
        Swal.fire({
          title: 'Cập nhật thất bại!',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(err);
    });
    
  }

  onRefuse() {

  }
}
