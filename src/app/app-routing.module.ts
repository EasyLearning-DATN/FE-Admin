import { NgModule } from '@angular/core';

import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PackagePremiumComponent } from './components/package-premium/package-premium.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { LoginComponent } from './components/login/login.component';
import { ReportComponent } from './components/lesson/report/report.component';
import { UsersComponent } from './components/users/users.component';
import { InvoiceComponent } from './components/package-premium/invoice/invoice.component';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'premium-manager', component: PackagePremiumComponent},
  { path: 'list-lesson', component: LessonComponent},
  { path: 'list-user', component: UsersComponent},
  { path: 'report-lesson', component: ReportComponent},
  { path: 'list-invoice', component: InvoiceComponent},
  { path: 'lesson-detail', component: LessonDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true,
    urlUpdateStrategy: 'eager',
    paramsInheritanceStrategy: 'always',
    scrollPositionRestoration: 'top', // Chỉ định vị trí cuộn sau khi chuyển hướng
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
