(function () {
    const list = document.getElementById('catalogList');

    //get response body from server
    async function getData(url = '') {
        let response = await fetch(url, {
            method: 'GET',
        });
        return response.json();
    }

    //TODO: maybe add different types validation
    function sortArrayOfNotesByNameLogic(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        // a должно быть равным b
        return 0;
    }

    async function fillEmptyCatalogWithDataOnPage(data) {
        for (let note of data) {
            let li = document.createElement("li");
            li.id = note.id;
            // let span = document.createElement("span");
            // span.innerText = note.name
            li.innerText = note.name;
            // li.append(span);
            list.append(li);
        }
    }

    function clearCatalogOnPage() {
        list.innerHTML = '';
    }

    // warning: deletes previous notes
    async function updateFullCatalogOnPage() {
        const data = await getData('http://127.0.0.1:3000/catalog/getTitles');
        data.sort(sortArrayOfNotesByNameLogic);
        clearCatalogOnPage();
        await fillEmptyCatalogWithDataOnPage(data);
    }

    async function documentLoadedHandler(e) {
        await updateFullCatalogOnPage();
    }

    document.addEventListener('DOMContentLoaded', documentLoadedHandler);
    // document.addEventListener('click', documentLoadedHandler);

    return {
        getData,
        sortArrayOfNotesByNameLogic,
        fillEmptyCatalogWithDataOnPage,
        clearCatalogOnPage,
        updateFullCatalogOnPage,
    }
})()
