import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    //console.log(value.split('').reverse().join(''))
    return value.split('').reverse().join('');
  }

}
