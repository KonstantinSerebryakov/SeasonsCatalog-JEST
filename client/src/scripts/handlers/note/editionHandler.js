import {getNotePageElementsData} from "../../logic/utility/getNotePageElements";
import {getPageIdParameter} from "../../logic/utility/getCurrentPageParameters";

// import {validNoteData} from "../../logic/validators/noteValidator";

async function notePutHandler(data) {
    const requests = require('../../logic/requests');
    data.id = getPageIdParameter();
    console.log(data);
    await requests.putNote(data);
}

export async function noteEditionHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    const data = getNotePageElementsData();

    const noteValidator = require("../../logic/validators/noteValidator");
    let validCode = await noteValidator.validNoteData(data);

    if (validCode === 1) {
        alert("Все поля должны быть заполнены.");
    } else if (validCode === 2) {
        alert("Проверьте введённые вами данные.");
    } else if (validCode === -1) {
        await notePutHandler(data);
        alert("Данные успешно изменены.");
        history.back();
    }
}
