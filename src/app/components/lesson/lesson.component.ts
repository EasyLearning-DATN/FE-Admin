import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { LessonsResponses } from 'src/app/responses/lessons/lessons.responses';
import { LessonService } from 'src/app/services/lesson.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {
  isFetching = false;
  lessons: LessonResponses[] = [];
  error = null;

  constructor(
    // private loginSrv: LoginService,
    // private httpClient: HttpClient,
    private router: Router,
    private lessonService: LessonService,
    private sharedService: SharedService,
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
    this.lessonService.getListLesson().subscribe((lessons: LessonsResponses) => {
      this.isFetching = false;
      this.lessons = this.sharedService.lessonsHome;
      console.log("Lessons: " + this.lessons);
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(this.error);
    });

  }
}
