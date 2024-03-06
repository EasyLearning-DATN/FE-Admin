import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginDTO } from './dtos/user/login.dto';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FE-Admin';
  // biến isLogin mặt định false
  isLogin: boolean = false;

  // lấy token từ localStorage
  token = localStorage.getItem('token');
  // nếu có token set isLogin = true
  ngOnInit() {
    if (this.token) {
      this.isLogin = true;
    }
  }
}
