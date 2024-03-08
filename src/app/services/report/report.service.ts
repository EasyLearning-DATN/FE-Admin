import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ReportDTO } from 'src/app/dtos/report/report.dto';
import { ReportResponses } from 'src/app/responses/report/report.responses';
import { ReportSResponses } from 'src/app/responses/reports/reports.responses';
import { environment } from 'src/environments/environments';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiGetAllReport = environment.API_URL + environment.API_ADMIN + environment.VERSION_1 + environment.API_REPORT;
  private apiGetInfoLesson = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_LESSON;
  private apiChangeStauts = environment.API_URL + environment.API_ADMIN + environment.VERSION_1 + environment.API_CHANGE_REPORT;
  constructor(
    private router: Router,
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  // get all report có xác thực token lưu vào sharedService
  getAllReport(token: string) {
    return this.http.get<any>(this.apiGetAllReport, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .pipe(
        map((response) => {
          let reports: ReportSResponses = response.data;
          reports.data = reports.data.map(report => {
            return { ...report }
          });
          return reports;
        }),
        tap((reports: ReportSResponses) => {
          this.sharedService.reportDetail = reports.data;
        }));
  }

  // get lesson by id được truyền vào từ component
  getInfoLesson(id: number) {
    return this.http.get<any>(this.apiGetInfoLesson + '/' + id);
  }

  // update report
  updateReport(reportId: string, status: string, token: string): Observable<any> {
    console.log('Hihi' + reportId, status);
    return this.http.patch<any>(this.apiChangeStauts, { reportId, status }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }
}
