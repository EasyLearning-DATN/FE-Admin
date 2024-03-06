import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { ReportDTO } from 'src/app/dtos/report/report.dto';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiGetAllReport = environment.API_URL + environment.API_ADMIN + environment.VERSION_1 + environment.API_REPORT + '?type=LESSON&status=PENDING';
  private apiGetInfoLesson = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_LESSON ;
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // get all report có xác thực token
  getAllReport() {
    return this.http.get<any>(this.apiGetAllReport, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  // get lesson by id được truyền vào từ component
  getInfoLesson(id: number) {
    return this.http.get<any>(this.apiGetInfoLesson + '/' + id);
  }
}
