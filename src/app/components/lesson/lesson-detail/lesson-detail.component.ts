import { Component } from '@angular/core';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { QuestionResponses } from 'src/app/responses/question/question.responses';
import { LessonDetailServiceService } from 'src/app/services/lesson/lesson-detail-service.service';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent {

  lessonDetail: LessonResponses | null = null;
  questions: QuestionResponses[] = [];

  constructor(private lessonDetailService: LessonDetailServiceService,
    private questionService: QuestionService,) { }

  ngOnInit(): void {
    this.lessonDetailService.getLessonDetail().subscribe((data) => {
      this.lessonDetail = data.lesson;
      this.questions = data.questions;
    });
  }

}
