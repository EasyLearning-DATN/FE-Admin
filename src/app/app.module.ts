import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UsersComponent } from './components/users/users.component';
import {allIcons, ColorTheme, NgxBootstrapIconsModule} from "ngx-bootstrap-icons";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { PackagePremiumComponent } from './components/package-premium/package-premium.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './components/lesson/report/report.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {fas} from '@fortawesome/free-solid-svg-icons';
import { ReportDetailComponent } from './components/lesson/report/report-detail/report-detail.component';
import { LessonQuestionsComponent } from './components/lesson/lesson-questions/lesson-questions.component';
import { InvoiceComponent } from './components/package-premium/invoice/invoice.component';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    UserInfoComponent,
    UsersComponent,
    PackagePremiumComponent,
    SidebarComponent,
    LessonComponent,
    LoginComponent,
    ReportComponent,
    ReportDetailComponent,
    LessonQuestionsComponent,
    InvoiceComponent,
    LessonDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(allIcons, {
      theme: ColorTheme.Dark,
    }),
    FontAwesomeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab)
  }
}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
