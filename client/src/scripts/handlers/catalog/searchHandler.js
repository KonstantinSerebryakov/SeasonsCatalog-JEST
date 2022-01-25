import { filterList } from '../../logic/list/filtration';

export function handleValueSize(value, size = 50) {
    if (value.length > size) {
        return value.substr(0, size);
    }
    return value;
}

export function searchListHandler(e) {
    const list = document.getElementById('catalogList');

    let value = e.target.value;
    value = handleValueSize(value);
    e.target.value = value;

    let listItems = list.getElementsByTagName('li');
    filterList(listItems, value);
}