import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiGetAllInvoice = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_INVOICE;

  token = this.shareService.getToken();
  constructor(
    private shareService: SharedService,
    private http: HttpClient
  ) {

  }

  GetAllInvoice() {
    return this.http.get<any>(this.apiGetAllInvoice, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    });
  }
}
