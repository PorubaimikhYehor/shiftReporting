import { Component, OnInit } from '@angular/core';
import { GridsterOptions } from 'src/app/modules/grid';
import { FormGroup } from '@angular/forms';
import { Template } from '@models/*';
// import { DashboardService } from 'src/app/modules/template/services/dashboard.service';
import { Subscription } from 'rxjs';
// import { DynControl } from '@models/*';

@Component({
  selector: 'app-dyn-table',
  templateUrl: './dyn-table.component.html',
  styleUrls: ['./dyn-table.component.scss']
})
export class DynTableComponent implements OnInit {

  template: Template = null;

  options: GridsterOptions = {};
  formGrinsterOptions: FormGroup;
  options$: Subscription;
  // selectedControl: DynControl;

  constructor( 
    // private dashboardService: DashboardService
    ) { }

  ngOnInit(): void {

    // this.options$ = this.dashboardService.getOptions().subscribe(options => {
    //   if (!options || !this.template) return;
    //   this.template.body.gridsterOptions = options
    //   this.options = options;
    //   this.formGrinsterOptions
    // })
  }

}
