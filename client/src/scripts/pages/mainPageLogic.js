import { loginFormHandler } from '../handlers/loginHandlers';
import { searchListHandler } from '../handlers/catalog/searchHandler';
import { getListHandler } from '../handlers/catalog/getListHandler';
import { catalogNavigationHandler } from '../handlers/catalog/navigationHandler';

export function mainPageLogic() {
    console.log('WebPack: It is main page logic');

    //login
    const form = document.getElementById('adminSignIn');
    form.addEventListener('submit', loginFormHandler);

    //list synchronization
    document.addEventListener('DOMContentLoaded', getListHandler);
    //list searching
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', searchListHandler);
    //list navigation
    const list = document.getElementById('catalogList');
    list.addEventListener('click', catalogNavigationHandler);
}
