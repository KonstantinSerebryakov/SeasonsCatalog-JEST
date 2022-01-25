import {getListHandler} from "../handlers/catalog/getListHandler";
import {searchListHandler} from "../handlers/catalog/searchHandler";
import {catalogDeletionHandler} from "../handlers/catalog/deletionHandler";

export function deletionPageLogic() {
    document.addEventListener('DOMContentLoaded', getListHandler);
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', searchListHandler);
    const list = document.getElementById('catalogList');
    list.addEventListener('click', catalogDeletionHandler);
}