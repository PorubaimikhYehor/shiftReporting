import { Component,Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { Department,State, Template} from '@models/*';
import { select, Store } from '@ngrx/store';
import { TemplateActions } from '@actions/*';
import { allTemplates } from 'src/app/app-store';
import { Subscription } from 'rxjs';
import { TemplateHttpService } from 'src/app/app-store/template/template-http.service';


export interface Data{
  templateName:string,
  departmentsAvailable:Department[],
  currentDepartmentId:number
}

@Component({
  selector: 'app-template-copy',
  templateUrl: './template-copy.component.html',
  styleUrls: ['./template-copy.component.scss']
})

export class TemplateCopyComponent{
  templates$: Subscription;
  templates?:Template[];
  departmentsAvailable!:Department[];
  departmentId!:number;
  name!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:Data,private store: Store<State>,private templateHttpService:TemplateHttpService) {
    this.name = this.data.templateName;
    this.departmentsAvailable = this.data.departmentsAvailable;
  }

  
 ngOnInit(){
  
  // this.onChangeId();
  
 }

 newName = new FormControl('',[Validators.required,this.nameValidator(this.templates)]);

 getErrorMessage() {
  if (this.newName.hasError('required')) {
    return 'You must enter a value';
  }

  return this.newName.hasError('name') ? 'Please change the name' : '';
}

nameValidator(templates:Template[]):ValidatorFn{
  return (control: AbstractControl):ValidationErrors|null=>{

  let res=null;
  if(templates){
    templates.forEach(
      (template:Template)=>{
        if(template.name === control.value){
          res = {'name':true};
        }
      })
        
      }
  
  return res;
}
}

onChangeId(){
  this.templateHttpService.getTemplates(this.departmentId)
  .subscribe((resp)=>{ 
    let temp:Template[] = [];
    resp.body.forEach((element:Template) => {
      temp.push(element);
    });
    this.templates = temp;
    this.newName.setValidators([Validators.required,this.nameValidator(this.templates)]);
    this.newName.updateValueAndValidity();
  });

  
  }
  


}
