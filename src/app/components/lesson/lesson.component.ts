import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { LessonsResponses } from 'src/app/responses/lessons/lessons.responses';
import { QuestionTypeResponses } from 'src/app/responses/question-type/question-type.responses';
import { QuestionResponses } from 'src/app/responses/question/question.responses';
import { LessonService } from 'src/app/services/lesson.service';
import { LessonDetailServiceService } from 'src/app/services/lesson/lesson-detail-service.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserService } from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {
  currentPage = 0;
  lessonsPerPage = 10;
  totalPages = 0;
  totalPageArray: number[] = [];
  isFetching = false;
  lessons: LessonResponses[] = [];
  error = null;
  lessonDetail: any;
  @ViewChild('modal') modal: any;
  @Input() question!: QuestionResponses;
  questionTypes!: QuestionTypeResponses[];
  @Input() nameCode: string = "sca";
  questions!: QuestionResponses[];


  constructor(
    // private loginSrv: LoginService,
    // private httpClient: HttpClient,
    private router: Router,
    private lessonService: LessonService,
    private sharedService: SharedService,
    private questionService: QuestionService,
    private modalService: NgbModal,
    private lessonDetailService: LessonDetailServiceService
  ) {
  }

  ngOnInit(): void {
    this.fetchLessons();
  }


  private fetchLessons() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.lessonService.getListLesson(this.currentPage, this.lessonsPerPage).subscribe(
      (response: any) => {
        Swal.close();
        this.totalPages = response.data.totalPage; // Tổng số trang
        this.calculateTotalPageArray();
        this.lessons = response.data.data;
      },
      (error) => {
        Swal.close();
      }
    );
  }

  calculateTotalPageArray(): void {
    this.totalPageArray = [];
    for (let i = 0; i <= this.totalPages; i++) {
      this.totalPageArray.push(i);
    }
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchLessons();
  }

  viewLessonDetail(lesson: LessonResponses) {
    this.questionService.getListQuestion(lesson.id).subscribe((questions) => {
      this.lessonDetailService.setLessonDetail(lesson, questions.data); // Chia sẻ dữ liệu qua Service
      this.router.navigate(['/lesson-detail']); // Chuyển hướng đến trang mới
    });
  }

}
