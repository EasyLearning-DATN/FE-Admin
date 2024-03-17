import {Injectable} from '@angular/core';
import {LessonResponses} from "../../responses/lesson/lesson.responses";
import {Subject} from "rxjs";
import { ReportResponses } from 'src/app/responses/report/report.responses';
import { QuestionListResponses } from 'src/app/responses/question/question.responses';
import { QuestionTypeResponses } from 'src/app/responses/question-type/question-type.responses';
import { UserResponse } from 'src/app/responses/user/user.responses';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  lessonChanged = new Subject<LessonResponses[]>();
  reportChanged = new Subject<ReportResponses[]>();
  questionsOfLessonChanged = new Subject<QuestionListResponses>();

  constructor() {
  }

  private _questionsOfLesson!: QuestionListResponses;

  get questionsOfLesson(): QuestionListResponses {
    return this._questionsOfLesson;
  }

  set questionsOfLesson(value: QuestionListResponses) {
    this._questionsOfLesson = value;
  }

  private _questionTypeResponses!: QuestionTypeResponses[];

  get questionTypeResponses(): QuestionTypeResponses[] {
    return this._questionTypeResponses;
  }

  set questionTypeResponses(value: QuestionTypeResponses[]) {
    this._questionTypeResponses = value;
  }

  private _lessonsHome!: LessonResponses[];

  get lessonsHome(): LessonResponses[] {
    return this._lessonsHome;
  }

  set lessonsHome(value: LessonResponses[]) {
    this._lessonsHome = value;
  }

  private _lesson!: LessonResponses;

  get lesson(): LessonResponses {
    return this._lesson;
  }

  set lesson(value: LessonResponses) {
    this._lesson = value;
  }

  private _lessonsByUser!: LessonResponses;

  get lessonsByUser() : LessonResponses {
    return this._lessonsByUser;
  }

  set lessonsByUser(value: LessonResponses) {
    this._lessonsByUser = value;
  }

  private _reportDetail!: ReportResponses[];

  get reportDetail(): ReportResponses[] {
    return this._reportDetail;
  }

  set reportDetail(value: ReportResponses[]) {
    this._reportDetail = value;
  }

  private _user!: UserResponse[];

  get user(): UserResponse[] {
    return this._user;
  }

  set user(value: UserResponse[]) {
    this._user = value;
  }
}
