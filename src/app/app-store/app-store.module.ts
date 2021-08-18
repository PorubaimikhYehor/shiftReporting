import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { PlantEffects } from './plant/plant.effects';
import { DepartmentEffects } from './department/department.effects';
import { ShiftEffects } from './shift/shift.effects';
import { ScheduleEffects } from './schedule/schedule.effects';
import { TemplateEffects } from './template/template.effects';
import { InterfaceEffects } from './interface/interface.effects';
import { DataEntryEffects } from './data-entry/data-entry.effects';
import * as fromUser from './user/user.reducer';
import { UserEffects } from './user/user.effects';
import * as fromConfiguration from './configuration/configuration.reducer';
import { ConfigurationEffects } from './configuration/configuration.effects';
import * as fromConnection from './connection/connection.reducer';
import { ConnectionEffects } from './connection/connection.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([
      PlantEffects,
      DepartmentEffects,
      ShiftEffects,
      ScheduleEffects,
      TemplateEffects,
      InterfaceEffects,
      DataEntryEffects,
      UserEffects,
      ConfigurationEffects,
      ConnectionEffects
    ]),
    // StoreModule.forFeature(fromConnection.connectionFeatureKey, fromConnection.reducer),
  ]
})
export class AppStoreModule { }
