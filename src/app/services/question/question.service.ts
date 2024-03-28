import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environments";
import {SharedService} from "../shared/shared.service";
import {HttpClient} from "@angular/common/http";
import {QuestionListResponses} from "../../responses/question/question.responses";
import {map, tap} from "rxjs";
import { QuestionDTO } from 'src/app/dtos/question/question.dto';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiGetListQuestion = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_QUESTION;
  private apiCreateListQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION;
  private apiDeleteQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION;
  private apiUpdateQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION;

  constructor(private sharedService: SharedService, private http: HttpClient) {
  }

  getListQuestion(lessonId: string) {
    return this.http.get(this.apiGetListQuestion, {
      params: {lessonId: lessonId},
    }).pipe(
      map(
        (response: any) => {
          let questions: QuestionListResponses = response.data;
          return questions;
        }),
      tap((response: QuestionListResponses) => {
        this.sharedService.questionsOfLesson = response;
      }, (error) => {
        console.log(error);
      }),
    );
  }

  putListQuestion(listQuestion: QuestionDTO[]) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(this.apiCreateListQuestion, listQuestion, {
      headers,
    });
  }

  deleteQuestion(id: string) {
    return this.http.delete(this.apiDeleteQuestion + '/' + id);
  }

  updateQuestion(updateQuestion: QuestionDTO, questionId: string) {
    return this.http.put(this.apiUpdateQuestion + '/' + questionId, updateQuestion);
  }


}