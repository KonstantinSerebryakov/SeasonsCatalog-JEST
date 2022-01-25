import {getNoteHandler} from '../../handlers/note/getNoteHandler';

export function noteDisplayLogic() {
    console.log('WebPack: It is note display logic');

    //note synchronization
    document.addEventListener('DOMContentLoaded', getNoteHandler);
}