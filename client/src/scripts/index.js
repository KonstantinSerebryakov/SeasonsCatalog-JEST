import '../styles/index.scss';
import '../styles/catalogListDisplay.scss';
import '../styles/mainPageHeader.scss';
import '../styles/mainAdminPageHeader.scss';
import '../styles/menuListDisplay.scss';
import '../styles/notePageBlocks.scss';
import '../styles/note.scss';
import '../styles/hoovers/deleteHoover.scss';
import '../styles/hoovers/editHoover.scss';

import {mainPageLogic} from './pages/mainPageLogic';
import {noteDisplayLogic} from './pages/notes/noteDisplayLogic';
import {createPageLogic} from './pages/notes/noteCreationLogic';
import {displayPageLogic} from './pages/displayPageLogic';
import {noteEditPageLogic} from "./pages/notes/noteEditionLogic";
import {deletionPageLogic} from "./pages/deletionPageLogic";

function bootstrapApp() {
    const path = window.location.pathname;
    console.log(path);
    switch (path) {
        case '/': { //index page
            mainPageLogic();
            break;
        }
        case '/page.html': {
            noteDisplayLogic();
            break;
        }
        case '/admin/create/page.html': {
            createPageLogic();
            break;
        }
        case '/admin/edit/list.html': {
            displayPageLogic();
            break;
        }
        case '/admin/edit/page.html': {
            noteEditPageLogic();
            break;
        }
        case '/admin/delete/list.html': {
            deletionPageLogic();
            break;
        }
        case '/admin/look/list.html': {
            displayPageLogic();
            break;
        }
        case '/admin/look/page.html': {
            noteDisplayLogic();
            break;
        }
        default: {
            console.log('WebPack: index page');
        }
    }
}

bootstrapApp();