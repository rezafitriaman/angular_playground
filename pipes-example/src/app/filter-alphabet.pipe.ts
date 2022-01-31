import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAlphabet'
})
export class FilterAlphabetPipe implements PipeTransform {

  transform(value: Array<any>, ...args: Array<any>): any {
    console.log([...args][0]);
    let sort = value.sort((a, b)=>{
      var nameA=a[[...args][0]].toLowerCase(), nameB=b[[...args][0]].toLowerCase();
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0; //default return value (no sorting)
    });
    console.log(sort);
    return sort;

  }


}
