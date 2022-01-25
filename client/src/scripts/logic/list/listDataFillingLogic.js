export async function fillEmptyCatalogWithDataOnPage(list, data) {
    for (let note of data) {
        let li = document.createElement("li");
        li.id = note.id;
        li.innerText = note.title;
        list.append(li);
    }
}
