import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { LessonsResponses } from 'src/app/responses/lessons/lessons.responses';
import { QuestionTypeResponses } from 'src/app/responses/question-type/question-type.responses';
import { QuestionResponses } from 'src/app/responses/question/question.responses';
import { LessonService } from 'src/app/services/lesson.service';
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
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
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
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(this.error);
    });
  }


  openModal(lesson: any) {
    this.lessonDetail = lesson;
    // Gửi yêu cầu lấy danh sách câu hỏi cho bài học
    this.questionService.getListQuestion(lesson.id).subscribe((questions) => {
      this.lessonDetail.questions = questions.data;
      console.log(questions.data);
      this.modalService.open(this.modal);
    });
  }

}
