import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { TemplateCardComponent } from './components/template-card/template-card.component';
import { RouterModule } from '@angular/router';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DepartmentsModule } from '../departments/departments.module';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TemplateCopyComponent } from './components/template-copy/template-copy.component';


@NgModule({
  declarations: [TemplatesComponent, TemplateCardComponent, SearchPipePipe, TemplateCopyComponent],
  imports: [
    CommonModule,
    RouterModule,
    UsedMaterialModule,
    DepartmentsModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class TemplatesModule { }
