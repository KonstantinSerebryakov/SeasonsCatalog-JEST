import {getNotePageElementsData} from "../../logic/utility/getNotePageElements";

// import {validNoteData} from "../../logic/validators/noteValidator";

async function notePostHandler(data) {
    const requests = require('../../logic/requests');
    await requests.postNote(data);
}

export async function noteCreationHandler(e) {
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
        await notePostHandler(data);
        alert("Данные успешно добавлены.");
        history.back();
    }
}
