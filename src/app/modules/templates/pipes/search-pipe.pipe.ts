import { Pipe, PipeTransform } from '@angular/core';
import { Template } from '@models/*';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(templates: Template[], query: string): Template[] {
    return templates
      .filter(template => template.name.toLowerCase().indexOf(query.toLowerCase()) != -1)
  }

}
