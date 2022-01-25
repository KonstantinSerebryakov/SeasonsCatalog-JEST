import {getNoteHandler} from "../../handlers/note/getNoteHandler";
import {noteEditionHandler} from "../../handlers/note/editionHandler";

export function noteEditPageLogic() {
    document.addEventListener('DOMContentLoaded', getNoteHandler);
    const form = document.getElementById('main_form');
    form.addEventListener('submit', noteEditionHandler);
    form.addEventListener('reset', () => {
        document.location.href = '/admin/edit/list.html';
    });
}