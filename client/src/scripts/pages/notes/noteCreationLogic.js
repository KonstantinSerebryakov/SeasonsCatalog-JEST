import {noteCreationHandler} from '../../handlers/note/creationHandler';

export function createPageLogic() {
    console.log("create page logic");

    // handle submit
    const form = document.getElementById('main_form');
    form.addEventListener('submit', noteCreationHandler);
    form.addEventListener('reset', () => {
        document.location.href = '/admin.html';
    });
}