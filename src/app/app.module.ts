import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UsersComponent } from './components/users/users.component';
import {allIcons, ColorTheme, NgxBootstrapIconsModule} from "ngx-bootstrap-icons";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { PackagePremiumComponent } from './components/package-premium/package-premium.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    UserInfoComponent,
    UsersComponent,
    PackagePremiumComponent,
    SidebarComponent,
    LessonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons, {
      theme: ColorTheme.Dark,
    }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(

    );
  }
}
