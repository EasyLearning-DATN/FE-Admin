import { Component } from '@angular/core';
import { ReportResponses } from 'src/app/responses/report/report.responses';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent{
  reports: ReportResponses[] = [];
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.getAllReport();
  }
  // get all report trong reportService
  getAllReport() {
    this.reportService.getAllReport().subscribe(
      (data) => {
      this.reports = data.data.data;
      // gán targetId
      this.reports.forEach((report) => {
        this.getInfoLesson(report.targetId);
      });
      console.log(this.reports);
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

}
