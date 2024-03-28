import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SharedService } from '../../shared/shared.service';
import { PackageResponse } from 'src/app/responses/package/packpage.responses';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePackageService {
  private apiPackge = environment.API_URL + environment.API_ADMIN + environment.VERSION_1 + environment.API_PACKAGE_UPGRADE;
  private apiGetAllPackage = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_PACKAGE_UPGRADE;

  constructor(
    private http: HttpClient,
    private shareService: SharedService
  ) { }

  token = this.shareService.getToken();

  createPackage(body: any) {
    return this.http.post<any>(this.apiPackge, body, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  getAllPackage() {
    return this.http.get<any>(this.apiGetAllPackage).pipe(
      map((response) => {
        let packages: PackageResponse = response.data.data;
        return packages;
      })
    );
  }
}
