import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TemplateHttpService } from './template-http.service';
import { TemplateActions } from '@actions/*';
import { mergeMap, filter, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';



@Injectable()
export class TemplateEffects {

  addTemplate$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.addTemplate),
    mergeMap(({ departmentId, template }) => this.templateHttpService.addTemplate({ departmentId, template }).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => TemplateActions.addTemplateSuccess({ template: resp.body }))
    )),
  ));

  copyTemplate$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.copyTemplate),
    mergeMap(({ departmentId, template }) => this.templateHttpService.addTemplate({ departmentId, template }).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => TemplateActions.copyTemplateSuccess({ template: resp.body }))
    )),
  ));

  updateTemplate$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.updateTemplate),
    mergeMap(({ template }) => this.templateHttpService.updateTemplate(template).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => TemplateActions.updateTemplateSuccess({
        template: {
          id: resp.body.templateId,
          changes: resp.body
        }
      }))
    )),
  ));

  getTemplates$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.getTemplates),
    mergeMap(({ departmentId }) => this.templateHttpService.getTemplates(departmentId).pipe(
      filter(resp => resp && resp.status === 200),
      map(({ body }) => TemplateActions.getTemplatesSuccess({ templates: body }))
    )),
  ));

  getTemplateTypes$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.getTemplateTypes),
    mergeMap(_ => this.templateHttpService.getTemplateTypes().pipe(
      filter(resp => resp && resp.status === 200),
      map(({ body }) => TemplateActions.getTemplateTypesSuccess({ templateTypes: body }))
    )),
  ));
  deleteTemplate$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.deleteTemplate),
    mergeMap(action => this.templateHttpService.deleteTemplate(action.id)
      .pipe(
        filter(resp => resp && resp.status === 200),
        map(_ => TemplateActions.deleteTemplateSuccess({ id: action.id }))
      )),
  ));

  constructor(
    private actions$: Actions,
    private templateHttpService: TemplateHttpService,
  ) { }

}
