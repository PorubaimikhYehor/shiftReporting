import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';
import { State} from '@models/*';
import { allFontFamilies, allFontSizes } from 'src/app/app-store';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { FontFamily, FontSize } from 'src/app/app-store/font/font.model';
import { getFontSizes } from 'src/app/app-store/font/font.actions';
import { FontActions } from '@actions/*';

@Component({
  selector: 'app-dyn-label',
  templateUrl: './dyn-label.component.html',
  styleUrls: ['./dyn-label.component.scss']
})
export class DynLabelComponent implements OnInit {
  options: ControlOptions;
  constructor(
    private clService: ControlsLocalService,
    private store:Store<State>
  ) { }

 
  initFont(){


    let settings =[]
    let fontFamilies:FontFamily[];
    let options = [];
    this.store.select(allFontFamilies).subscribe(fF => fontFamilies = fF);
    
    fontFamilies.forEach(
      (fF)=>{
        options.push({value:fF.value,viewValue:fF.name});
      }
    )
    settings.push({ controlId: 'fFamily', label: 'Font Family', type: 'select',options: options});

    let fontSizes:FontSize[];
    this.store.select(allFontSizes).subscribe(fS => fontSizes = fS);
    options = [];
    fontSizes.forEach(
      (fS)=>{
        options.push({value:fS.value,viewValue:fS.name});
      }
    )
    settings.push( { controlId: 'fSize', label: 'Font Size', type: 'select',options: options});
    return settings;

  }
  
  ngOnInit() {
    this.clService.getData().subscribe(options => {      
      this.options = options;
      this.options.control.settings = this.options.control.settings.concat(this.initFont());
      
    });
   
    
  }


}
