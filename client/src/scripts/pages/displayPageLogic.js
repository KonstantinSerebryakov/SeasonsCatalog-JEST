import {getListHandler} from "../handlers/catalog/getListHandler";
import {searchListHandler} from "../handlers/catalog/searchHandler";
import {catalogNavigationHandler} from "../handlers/catalog/navigationHandler";

export function displayPageLogic() {
    //list synchronization
    document.addEventListener('DOMContentLoaded', getListHandler);
    //list searching
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', searchListHandler);
    //list navigation
    const list = document.getElementById('catalogList');
    list.addEventListener('click', catalogNavigationHandler);
}
