import { Router } from '@angular/router';
import { AlertsService } from './../../services/alerts.service';
import { AuthService } from './../../services/auth.service';
import { Employee } from './../../interfaces/employee';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DatabaseService } from 'src/app/services/database.service';
import { Address } from 'src/app/interfaces/address';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employeeForm: FormGroup;
  addressForm: FormGroup;
  addressSelected: any = '';
  update: boolean = false;
  employeeSelected: number = 0;
  employeeSelectedAddress: Address[] = [];

  employees: Employee[] = [];
  columns = [
    { name: 'id' },
    { name: 'name' },
    { name: 'lastName' },
    { name: 'phone' },
  ];
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private builder: FormBuilder,
    private db: DatabaseService,
    private auth: AuthService,
    private _alert: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.builder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      id: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      dob: ['', [Validators.required]],
    });
    this.addressForm = this.builder.group({
      alias: ['', [Validators.required]],
      addressLine: ['', [Validators.required]],
      city: ['', [Validators.required]],
      sector: ['', [Validators.required]],
    });
    this.db.getData('employees').subscribe((emp: Employee[]) => {
      console.log(emp);
      this.employees = emp;
    });
  }

  saveEmployee() {
    this.db
      .setData(
        'employees/' + this.employeeForm.controls['id'].value,
        this.employeeForm.value
      )
      .then(() => {
        this._alert.success('Empleado agregado satisfactoriamente', 'Correcto');
      })
      .catch((error) => {
        this._alert.error(error.message, 'Error');
      });
  }

  saveAddress() {
    console.log(this.addressForm.value);
    let id = Date.now();
    let address = this.addressForm.value;
    address.id = id;
    this.db
      .setData(
        'employees/' +
          this.employees[this.employeeSelected].id +
          '/address/' +
          id,
        address
      )
      .then(() => {
        this._alert.success(
          'Dirección agregada satisfactoriamente',
          'Correcto'
        );
        this.ngxSmartModalService.create('address', 'content').close();
        this.ngxSmartModalService.create('details', 'content').close();
      })
      .catch((error) => {
        this._alert.error(error.message, 'Error');
      });
  }

  openAddress(pos) {
    this.employeeSelected = pos;
    this.employeeSelectedAddress = [];
    if (
      this.employees[pos].address != null &&
      this.employees[pos].address != undefined
    ) {
      for (let k in this.employees[pos].address) {
        let direction = this.employees[pos].address[k];
        console.log(direction);
        this.employeeSelectedAddress.push(direction);
      }
    }
    this.ngxSmartModalService.create('details', 'content').open();
  }

  deleteAddress(id) {
    this.db
      .deleteAddress(
        'employees/' +
          this.employees[this.employeeSelected].id +
          '/address/' +
          id
      )
      .then(() => {
        this._alert.success(
          'Dirección eliminada satisfactoriamente',
          'Correcto'
        );
        this.ngxSmartModalService.create('details', 'content').close();
      })
      .catch((error) => {
        this._alert.error(error.message, 'Error');
      });
  }

  openEdit(id) {
    this.addressSelected = this.employees[this.employeeSelected].address[id];
    console.log(this.addressSelected);
    this.update = true;
    this.addressForm.controls['alias'].setValue(this.addressSelected.alias);
    this.addressForm.controls['addressLine'].setValue(
      this.addressSelected.addressLine
    );
    this.addressForm.controls['city'].setValue(this.addressSelected.city);
    this.addressForm.controls['sector'].setValue(this.addressSelected.sector);
    this.ngxSmartModalService.create('address', 'content').open();
  }

  updateAddress() {
    let id = this.addressSelected.id;
    let address = this.addressForm.value;
    address.id = id;
    this.db
      .setData(
        'employees/' +
          this.employees[this.employeeSelected].id +
          '/address/' +
          id,
        address
      )
      .then(() => {
        this._alert.success(
          'Dirección Actualizada satisfactoriamente',
          'Correcto'
        );
        this.update = false;
        this.addressForm.reset();
        this.ngxSmartModalService.create('address', 'content').close();
        this.ngxSmartModalService.create('details', 'content').close();
      })
      .catch((error) => {
        this._alert.error(error.message, 'Error');
      });
  }

  logOut() {
    this.auth.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
