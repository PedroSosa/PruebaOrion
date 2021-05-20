import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private toastr: ToastrService) {}

  success(sms: string, title: string) {
    this.toastr.success(sms, title);
  }
  error(sms: string, title: string) {
    this.toastr.error(sms, title);
  }
}
