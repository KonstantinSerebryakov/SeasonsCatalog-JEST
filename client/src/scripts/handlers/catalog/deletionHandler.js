export async function catalogDeletionHandler(e) {
    let target = e.target;
    if (target.tagName === 'LI') {
        let id = target.id;

        const requests = require('../../logic/requests');
        await requests.deleteNote(id);

        window.location.reload(true);
    }
}