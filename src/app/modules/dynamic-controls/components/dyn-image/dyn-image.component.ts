import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dyn-image',
  templateUrl: './dyn-image.component.html',
  styleUrls: ['./dyn-image.component.scss']
})

export class DynImageComponent implements OnInit {

  options: ControlOptions;

  constructor(
    private clService: ControlsLocalService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.clService.getData().subscribe(options => {      
      this.options = options
    })
    console.log(this.options);
  }

}
