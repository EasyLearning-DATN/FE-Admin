import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { QuestionResponses } from 'src/app/responses/question/question.responses';

@Injectable({
  providedIn: 'root'
})
export class LessonDetailServiceService {

  private lessonDetailSubject = new BehaviorSubject<{lesson: LessonResponses | null, questions: QuestionResponses[]}>({lesson: null, questions: []});

  setLessonDetail(lesson: LessonResponses, questions: QuestionResponses[]) {
    this.lessonDetailSubject.next({lesson, questions});
  }

  getLessonDetail() {
    return this.lessonDetailSubject.asObservable();
  }

}
