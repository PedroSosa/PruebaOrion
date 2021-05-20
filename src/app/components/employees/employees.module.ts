import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    NgxSmartModalModule.forRoot(),
    EmployeesRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ],
})
export class EmployeesModule {}
