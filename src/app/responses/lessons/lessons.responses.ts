import {LessonResponses} from "../lesson/lesson.responses";

export interface LessonsResponses {
  id(id: any): unknown;
  totalPage: number;
  data: LessonResponses[];
}
