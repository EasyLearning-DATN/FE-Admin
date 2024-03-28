import { TestBed } from '@angular/core/testing';

import { LessonDetailServiceService } from './lesson-detail-service.service';

describe('LessonDetailServiceService', () => {
  let service: LessonDetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonDetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
