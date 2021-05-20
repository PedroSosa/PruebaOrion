import { AlertsService } from './../../../services/alerts.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private _alert: AlertsService
  ) {}

  ngOnInit(): void {}

  login() {
    this.auth
      .login(this.email, this.password)
      .then(() => {
        this._alert.success('Sesión iniciada satisfactoriamente', 'Correcto');
        this.router.navigate(['/employees'], { replaceUrl: true });
      })
      .catch((error) => {
        console.log(error);
        this._alert.error(error.message, 'Error!');
      });
  }
}
