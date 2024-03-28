import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { identity } from 'rxjs';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { QuestionTypeResponses } from 'src/app/responses/question-type/question-type.responses';
import { QuestionResponses } from 'src/app/responses/question/question.responses';
import { RoleResponse } from 'src/app/responses/role/role.response';
import { UserResponse } from 'src/app/responses/user/user.responses';
import { LessonService } from 'src/app/services/lesson.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserService } from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  isFetching = false;
  users: UserResponse[] = [];
  userDetail: any;
  error = null;
  status = '';
  role: RoleResponse[] = [];
  @ViewChild('modal') modal: any;



  constructor(
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.fetchUser();
    this.fetchRole();
  }


  private fetchUser() {
    const token = localStorage.getItem('token') || '';
    this.isFetching = true;
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.userService.getAllUser(token).subscribe(
      (users) => {
        this.isFetching = false;
        this.users = users.data.data;
        Swal.close();
      },
      (error) => {
        this.isFetching = false;
        this.error = error;
        Swal.close();
      }
    );
  }

  // get all role
  private fetchRole() {
    this.userService.getAllRole().subscribe(
      (roles) => {
        this.role = roles.data;
        console.log(this.role);
      },
      (error) => {
        this.error = error;
      }
    );
  }

    changeStatus(id: string) {
      const newStatus = this.userDetail.locked ? 'UNLOCK' : 'LOCK';
      this.userService.changeStatus(id, newStatus).subscribe(
        res => {
          this.fetchUser();
        },
        error => {
        }
      );
    }

  onChange(selectedValue: any) {
    console.log(selectedValue);
  }

  onSave(userId: string, roleId: string) {
    this.userService.updateRoleUser(userId, roleId).subscribe(
      res => {
        Swal.fire('Success', 'Update role success', 'success');
        this.fetchUser();
      },
      error => {
        Swal.fire('Error', 'Update role error', 'error');
      }
    );
  }

  onDelete(userId: string) {
    Swal.fire({
      title: 'Bạn chắc chắn?',
      text: 'Bạn chắc chắn muốn xoá người dùng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
          res => {
            Swal.fire('Thành công!', 'Xoá người dùng thành công', 'success');
            this.fetchUser();
          },
          error => {
            Swal.fire('Thất bại!', 'Xoá người dùng thất bại', 'error');
          }
        );
      }
    });
  }


  openModal(user: any) {
    this.userDetail = user;
    // Gửi yêu cầu lấy danh sách câu hỏi cho bài học
    this.userService.getRoleUser(user.id).subscribe((res) => {
      this.userDetail.role = res.data[0];
      console.log(this.userDetail.role.role);
      this.modalService.open(this.modal);
    });
  }
}
