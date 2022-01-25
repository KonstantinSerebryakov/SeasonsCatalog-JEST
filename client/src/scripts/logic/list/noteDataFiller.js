export function fillPageWithData(elements, data) {
    if (elements === null || elements.length === 0) {
        return;
    }

    elements.name.value = data.title;
    elements.producer.value = data.producer;
    elements.description.value = data.description;

    elements.date.value = data.date.substr(0, 7);

    let temp = elements.genre.querySelectorAll("input[checked]");
    for (let inp of temp) {
        inp.checked = false;
    }
    let str = data.genre;
    temp = elements.genre.querySelector(`#gen${str}`);
    temp.checked = true;
}
