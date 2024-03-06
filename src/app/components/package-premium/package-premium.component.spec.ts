import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePremiumComponent } from './package-premium.component';

describe('PackagePremiumComponent', () => {
  let component: PackagePremiumComponent;
  let fixture: ComponentFixture<PackagePremiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackagePremiumComponent]
    });
    fixture = TestBed.createComponent(PackagePremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
