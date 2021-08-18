import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynControl } from '@models/*';

@Component({
  selector: 'app-mobile-entry-form',
  templateUrl: './mobile-entry-form.component.html',
  styleUrls: ['./mobile-entry-form.component.scss']
})
export class MobileEntryFormComponent implements OnInit {
  @Input() dashboard: DynControl[];
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.dashboard = this.dashboard.filter(d=> d.type != "label");
    // console.log(this.dashboard);    
  }
}
