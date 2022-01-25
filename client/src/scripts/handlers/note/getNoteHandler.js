import {getPageIdParameter} from '../../logic/utility/getCurrentPageParameters';
// import {getFullNote} from '../../logic/requests';
const requests = require('../../logic/requests');
import {getNotePageElements} from '../../logic/utility/getNotePageElements';
import {fillPageWithData} from '../../logic/list/noteDataFiller';

export async function getNoteHandler(e) {
    const elements = getNotePageElements();
    let id = getPageIdParameter();
    let data = await requests.getFullNote(id);
    console.log(data);

    fillPageWithData(elements, data.body[0]);
}