import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { LessonsResponses } from '../responses/lessons/lessons.responses';
import { SharedService } from './shared/shared.service';
import { QuestionResponses } from '../responses/question/question.responses';
import { LessonDTO } from '../dtos/lesson/lesson.dto';
import { LessonResponses } from '../responses/lesson/lesson.responses';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiGetListLesson = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_LESSON;
  private apiGetListQuestionByLessonId = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_QUESTION;
  private apiUpdateLesson = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_LESSON;
  private apiGetOneLesson = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_LESSON;
  private apiDeleteLesson = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_LESSON;

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) { }

  getListLesson(page: number, perPage: number): Observable<LessonsResponses> {
    const url = `${this.apiGetListLesson}?page=${page}`;
    return this.http.get<LessonsResponses>(url);
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

  getOneLesson(id: string) {
    return this.http.get<any>(this.apiGetOneLesson + '/' + id).pipe(
      map((response) => {
        let lesson: LessonResponses = response.data;
        return {...lesson, questions: lesson.questions ? lesson.questions : []};

      }),
      tap((lesson: LessonResponses) => {
          this.sharedService.lesson = lesson;
          // console.log(lesson);
        }, error => {
          console.log(error.message);
          this.router.navigate(['404']);
        },
      ));
  }

  deleteLesson(id: string) {
    return this.http.delete(this.apiDeleteLesson + '/' + id);
  }

  updateLesson(id: string, lessonDTO: LessonDTO) {
    return this.http.put(this.apiUpdateLesson + '/' + id, lessonDTO);
  }
}
