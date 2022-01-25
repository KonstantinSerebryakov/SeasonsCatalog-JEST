// import { getNoteTitles } from '../../logic/requests';
const requests = require('../../logic/requests');
import { sortArrayOfNotesByNameLogic } from '../../logic/utility/sortLogic';
import { fillEmptyCatalogWithDataOnPage } from '../../logic/list/listDataFillingLogic';

export async function getListHandler(e) {
    console.log(e);
    const list = document.getElementById('catalogList');

    const data = await requests.getNoteTitles();
    if (data.status === 200) {
        let body = data.body;
        body.sort(sortArrayOfNotesByNameLogic);
        list.innerHTML = '';
        await fillEmptyCatalogWithDataOnPage(list, body);
    }
}