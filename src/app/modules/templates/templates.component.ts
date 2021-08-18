import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { Store, select } from '@ngrx/store';
import { State, Template, User } from '@models/*';
import { TemplateActions } from '@actions/*';
import { allTemplates, connectionStatus } from 'src/app/app-store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  currentUser: User;
  departmentId: number;
  templates: Template[] = [];
  templates$: Subscription;
  isConnected: boolean;

  constructor(
    private authSevice: AuthorizationService,
    private store: Store<State>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.select(connectionStatus)
      .subscribe(status => this.isConnected = status)

    this.templates$ = this.store.pipe(
      select(allTemplates)
    ).subscribe(templates => {
      this.templates = templates;
      // autostart first template
      // templates.length && this.editTemplate(templates[0].templateId)
    }
    );

    this.authSevice.getCurrentUser()
      .subscribe(user => {
        if (!user) {
          this.currentUser = null;
          return;
        }
        this.currentUser = user;
        // this.selectDepartment({ value: user.departments[0].departmentId })
      });

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.templates$.unsubscribe();
  }

  selectDepartment({ departmentId }) {
    this.departmentId = departmentId;
    this.store.dispatch(TemplateActions.getTemplates({ departmentId }));
  }
  editTemplate(event) {
    const template = JSON.parse(JSON.stringify(this.templates.find(i => i.templateId === event)));
    this.store.dispatch(TemplateActions.setEditingTemplate({ template }));
    this.router.navigate(['configuration/templates/' + event])
  }
  delete(id) {
    this.store.dispatch(TemplateActions.deleteTemplate({ id }))
  }

  addTemplate() {
    const _departmentId = this.departmentId;
    this.store.dispatch(TemplateActions.setEditingTemplate({ template: <Template>{ _departmentId } }));
    this.router.navigate(['configuration/templates/' + 'new'])
  }
}
