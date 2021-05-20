import { Router } from '@angular/router';
import { DatabaseService } from './../../../services/database.service';
import { AlertsService } from './../../../services/alerts.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private _alert: AlertsService,
    private db: DatabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    });
  }

  register() {
    console.log(this.registerForm.value);

    this.auth
      .register(
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value
      )
      .then((user) => {
        console.log(user.user.uid);
        this.db
          .setData('adminUsers/' + user.user.uid, {
            name: this.registerForm.controls['name'].value,
            email: this.registerForm.controls['email'].value,
            uid: user.user.uid,
          })
          .then(() => {
            this._alert.success(
              'Usuario registrado satisfactoriamente',
              'Correcto'
            );
            this.router.navigate(['/employees'], { replaceUrl: true });
          })
          .catch((error) => {
            this._alert.error(error.message, 'Error');
          });
      })
      .catch((error) => {
        this._alert.error(error.message, 'Error');
      });
  }
}
