import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'itemFilter'
})
export class ItemFilterPipe implements PipeTransform{
    transform(dataArray: any, searchTerm: string): any {
        if(!dataArray || !searchTerm){
            return dataArray;
        }
        return dataArray.filter(item =>
            item.titre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}