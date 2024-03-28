import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageResponse } from 'src/app/responses/package/packpage.responses';
import { CreatePackageService } from 'src/app/services/upgrade/upgrade/create-package.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package-premium',
  templateUrl: './package-premium.component.html',
  styleUrls: ['./package-premium.component.css']
})
export class PackagePremiumComponent implements OnInit{
  frmAddPurchase!: FormGroup;
  packages: any;
  @ViewChild('addPurchase') modal: any;

  constructor(
    private modalService: NgbModal,
    private packageService: CreatePackageService
  ) {
    this.frmAddPurchase = this.createPurchaseForm();
  }
  ngOnInit(): void {
    this.fechPackage();
  }

  createPurchaseForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sale: new FormControl('', [Validators.required]),
      expiry: new FormControl('', [Validators.required]),
    });
  }

  onAddPurchase(): void {
    this.packageService.createPackage(this.frmAddPurchase.value).subscribe(
      (data) => {
        console.log(this.frmAddPurchase.value);
        Swal.fire({
          icon: 'success',
          title: 'Thành công...',
          text: 'Tạo gói thành công!',
        });
        this.fechPackage();
        this.modalService.dismissAll();
      },
      (error) => {
        console.log("Error", error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi...',
          text: 'Tạo gói thất bại!',
        });
      }
    );
  }

  fechPackage() {
    this.packageService.getAllPackage().subscribe(
      (data : any) => {
        this.packages = data;
        console.log(this.packages);
      },
      (error) => {
        console.log("Error", error);
      }
    );
  }

  openModal() {
    this.modalService.open(this.modal);
  }

  onExpiryChange(event: any) {
    const value = event.target?.value;
    if (value !== undefined && value !== null) {
      this.frmAddPurchase.get('expiry')?.setValue(value);
    }
  }
  
}
