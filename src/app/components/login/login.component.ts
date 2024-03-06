import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from 'src/app/dtos/user/login.dto';
import { UserResponse } from 'src/app/responses/user/user.responses';
import { UserService } from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  username: string = '';
  password: string = '';
  userResponse?: UserResponse | null;

  constructor (
    private userService: UserService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginDTO: LoginDTO = {
        username: this.username,
        password: this.password
      };
      console.log(loginDTO);
      this.userService.login(loginDTO).subscribe(
        (response: any) => {
          const token = response.data.token;
          Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công!',
            text: 'Bạn đã đăng nhập thành công tài khoản!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              // lấy user info và đưa thông tin vào userResponse
              this.userService.getUserInfo(token).subscribe(
                (data : any) => {
                  const userInfo = data.data;
                  // set userInfo vào UserResponse
                  this.userResponse = userInfo;
                  localStorage.setItem('userInfo', JSON.stringify(this.userResponse));
                  localStorage.setItem('token', token);
                  location.assign('/');
                  console.log(this.userResponse);
                }
              )
            }
          });
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('invalid form');
    }
  }
  

}
