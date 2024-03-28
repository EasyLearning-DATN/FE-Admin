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
      Swal.fire({
        title: 'Đang đăng nhập...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      
      });
      this.userService.login(loginDTO).subscribe(
        (response: any) => {
          const token = response.data.token;
         localStorage.setItem('token', token);
         this.userService.getUserInfo(token).subscribe(
            (response: any) => {
              const userId = response.data.id;
              this.userService.getRoleUser(userId).subscribe(
                (response: any) => {
                  console.log(response.data[0].role);
                 if (response.data[0].role === "admin") {
                  this.userResponse = response.data;
                  console.log(this.userResponse);
                  localStorage.setItem('userInfo', JSON.stringify(this.userResponse));
                  Swal.fire({
                    title: 'Đăng nhập thành công!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then(() => {
                    window.location.href = '/';
                  });
                 } else {
                  Swal.fire({
                    title: 'Đăng nhập thất bại!',
                    text: 'Bạn không có quyền truy cập!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
                 }
                },
                error => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log(error);
            }
          );
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
