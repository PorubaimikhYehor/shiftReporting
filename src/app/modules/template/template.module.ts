import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { GeneralConfigComponent } from './components/general-config/general-config.component';
import { FormModule } from '../form/form.module';
import { GridsterConfigComponent } from './components/gridster-config/gridster-config.component';
import { GridModule } from '../grid/grid.module';
import { InterfacesConfigComponent } from './components/interfaces-config/interfaces-config.component';
import { ControlsListComponent } from './components/controls-list/controls-list.component';
import { ControlConfigComponent } from './components/control-config/control-config.component';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { SettingsFileComponent } from './components/settings-file/settings-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsPiafComponent } from './components/settings-piaf/settings-piaf.component';
import { SettingsDBComponent } from './components/settings-db/settings-db.component';
import { PiafModule } from '../piaf/piaf.module';
import { SettingsControlComponent } from './components/settings-control/settings-control.component';
import { NotificationsUsersListComponent } from './components/notifications-users-list/notifications-users-list.component';



@NgModule({
  declarations: [TemplateComponent, GeneralConfigComponent, GridsterConfigComponent, InterfacesConfigComponent, ControlsListComponent, ControlConfigComponent, SettingsFileComponent, SettingsPiafComponent, SettingsDBComponent, SettingsControlComponent, NotificationsUsersListComponent],
  imports: [
    CommonModule,
    FormModule,
    GridModule,
    UsedMaterialModule,
    ReactiveFormsModule,
    PiafModule
  ],
})
export class TemplateModule { }
