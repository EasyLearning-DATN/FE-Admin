import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpParams } from "@angular/common/http";
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { LessonsResponses } from '../responses/lessons/lessons.responses';
import { SharedService } from './shared/shared.service';
import { QuestionResponses } from '../responses/question/question.responses';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiGetListLesson = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_LESSON;
  private apiGetListQuestionByLessonId = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_QUESTION;

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getListLesson() {
    return this.http.get<any>(this.apiGetListLesson)
      .pipe(
        map((response) => {
          let lessons: LessonsResponses = response.data;
          lessons.data = lessons.data.map(lesson => {
            return { ...lesson, questions: lesson.questions ? lesson.questions : [] };
          });
          return lessons;
        }),
        tap((lessons: LessonsResponses) => {
          this.sharedService.lessonsHome = lessons.data;
        }),
        switchMap((lessons: LessonsResponses) => {
          return forkJoin(lessons.data.map(lesson => this.getListQuestionByLessonId(lesson.id)));
        })
      );
  }

  getListQuestionByLessonId(lessonId: string) {
    return this.http.get<any>(this.apiGetListQuestionByLessonId + '?lessonId=' + lessonId)
      .pipe(
        map((response) => {
          let questions: QuestionResponses = response.data.data;
          return questions;
        }),
        tap((questions: QuestionResponses) => {
      }));
  }
}
