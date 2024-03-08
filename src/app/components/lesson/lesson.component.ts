import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { LessonsResponses } from 'src/app/responses/lessons/lessons.responses';
import { LessonService } from 'src/app/services/lesson.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserService } from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {
  isFetching = false;
  lessons: LessonResponses[] = [];
  error = null;
  lessonDetail: any;
  @ViewChild('modal') modal: any;

  constructor(
    // private loginSrv: LoginService,
    // private httpClient: HttpClient,
    private router: Router,
    private lessonService: LessonService,
    private sharedService: SharedService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    // this.isLogin = this.loginSrv.checkLogin();
    // show lesson data
    // this.httpClient.get<any[]>(`${api}/lesson/all`).subscribe((res: any) => {
    //     this.lessons = res.data;
    // });
    this.fetchLessons();
  }

  private fetchLessons() {
    this.isFetching = true;
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.lessonService.getListLesson().subscribe(() => {
      Swal.close();
      this.isFetching = false;
      this.lessons = this.sharedService.lessonsHome;
      console.log(this.lessons);
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(this.error);
    });
  }

  openModal(lesson: any) {
    this.lessonDetail = lesson;
    this.modalService.open(this.modal); // Open modal using modal service
  }
}
