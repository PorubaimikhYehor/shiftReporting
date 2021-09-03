import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicControlsComponent } from './dynamic-controls.component';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { DynDatetimeComponent } from './components/dyn-datetime/dyn-datetime.component';
import { DynCheckboxComponent } from './components/dyn-checkbox/dyn-checkbox.component';
import { DynNumberComponent } from './components/dyn-number/dyn-number.component';
import { DynTimeComponent } from './components/dyn-time/dyn-time.component';
import { DynTextComponent } from './components/dyn-text/dyn-text.component';
import { DynSelectComponent } from './components/dyn-select/dyn-select.component';
import { DynTextareaComponent } from './components/dyn-textarea/dyn-textarea.component';
import { DynColorComponent } from './components/dyn-color/dyn-color.component';
import { DynLabelComponent } from './components/dyn-label/dyn-label.component';
import { DynDateComponent } from './components/dyn-date/dyn-date.component';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DynImageComponent } from './components/dyn-image/dyn-image.component';
import { DynTableComponent } from './components/dyn-table/dyn-table.component';
import { InputFComponent } from './components/input-f/input-f.component';

@NgModule({
  declarations: [DynImageComponent, DynTableComponent, InputFComponent, DynamicControlsComponent, InputComponent, SelectComponent, DynDatetimeComponent, DynCheckboxComponent, DynNumberComponent, DynTimeComponent, DynTextComponent, DynSelectComponent, DynTextareaComponent, DynColorComponent, DynLabelComponent, DynDateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UsedMaterialModule
  ],
  exports: [
    DynamicControlsComponent
  ]
})
export class DynamicControlsModule { }
