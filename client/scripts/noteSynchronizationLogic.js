(function () {
    // const list = document.getElementById('catalogList');

    //get response body from server
    async function getData(url = '') {
        let response = await fetch(url, {
            method: 'GET',
        });
        return response.json();
    }

    // async function fillEmptyCatalogWithDataOnPage(data) {
    //     for (let note of data) {
    //         let li = document.createElement("li");
    //         li.id = note.id;
    //         li.innerText = note.name;
    //         list.append(li);
    //     }
    // }

    // warning: deletes previous notes
    // async function synchronizePage() {
    //     const data = await getData('http://127.0.0.1:3000/catalog/getTitles');
    //     await fillEmptyCatalogWithDataOnPage(data);
    // }

    async function synchronizePage(id) {
        let url = new URL(id.toString(), 'http://127.0.0.1:3000/catalog/getNote/');

        const data = await getData(url);
    }

    async function documentLoadedHandler(e) {
        let url = new URL(document.location.href.toString());
        let id = url.searchParams.get('id');

        await synchronizePage(id);
    }

    document.addEventListener('DOMContentLoaded', documentLoadedHandler);
})()
