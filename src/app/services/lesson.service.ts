import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, tap } from 'rxjs';
import { LessonsResponses } from '../responses/lessons/lessons.responses';
import { SharedService } from './shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  
  private apiGetListLesson = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_LESSON;

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getListLesson() {
    return this.http.get<any>(this.apiGetListLesson, {
      
    })
    .pipe(
      map((response) => {
        let lessons: LessonsResponses = response.data;
        lessons.data = lessons.data.map(lesson => {
          return {...lesson, questions: lesson.questions ? lesson.questions : []};
        });
        return lessons;
      }),
      tap((lessons: LessonsResponses) => {
        this.sharedService.lessonsHome = lessons.data;
        console.log(lessons.data);
        console.log(this.sharedService.lessonsHome);
      }));
  }
}
