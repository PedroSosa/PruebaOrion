import { Router } from '@angular/router';
import { AlertsService } from './../../../services/alerts.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  email: string = '';
  constructor(
    private auth: AuthService,
    private _alert: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  forgot() {
    this.auth
      .forgot(this.email)
      .then(() => {
        this._alert.success(
          'Email de recuperación enviado, revisa tu bandeja de email',
          'Correcto'
        );
        this.email = '';
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this._alert.error(error.message, 'Error');
      });
  }
}
