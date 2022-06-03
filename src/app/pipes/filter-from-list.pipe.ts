import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	name: 'filterFromList'
})
export class FilterFromListPipe implements PipeTransform {

	transform(value: any, list: any[], propertyName?: any, returnPropertyName?: any): any {
		const getParamValue = value || '';
		const item = list.filter(i => i.hasOwnProperty(propertyName) && i[propertyName].toString().toLowerCase() === getParamValue.toString().toLowerCase());
		if (item && item.length > 0) {
			return item[0][returnPropertyName];
		} else {
			return '';
		}
	}

}