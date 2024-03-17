import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonQuestionsComponent } from './lesson-questions.component';

describe('LessonQuestionsComponent', () => {
  let component: LessonQuestionsComponent;
  let fixture: ComponentFixture<LessonQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonQuestionsComponent]
    });
    fixture = TestBed.createComponent(LessonQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
