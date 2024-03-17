import { Component, Input, OnInit } from '@angular/core';
import { QuestionTypeResponses } from 'src/app/responses/question-type/question-type.responses';
import { QuestionResponses } from 'src/app/responses/question/question.responses';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-lesson-questions',
  templateUrl: './lesson-questions.component.html',
  styleUrls: ['./lesson-questions.component.css']
})
export class LessonQuestionsComponent implements OnInit {
  @Input() questions: QuestionResponses[] = [];

  constructor(private sharedService: SharedService) {

  }

  ngOnInit() {
    
  }
}
