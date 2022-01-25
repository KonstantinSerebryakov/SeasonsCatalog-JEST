export function getNotePageElements() {
    return {
        name: document.getElementById('name_input'),
        // poster: document.getElementById('poster'),
        genre: document.getElementById('genre'),
        producer: document.getElementById('producer'),
        description: document.getElementById('about'),
        date: document.getElementById('date'),
    };
}

export function getNotePageElementsData() {
    const elements = getNotePageElements();

    return {
        name: elements.name.value,
        producer: elements.producer.value,
        description: elements.description.value,
        date: elements.date.value,
        genre: elements.genre.querySelector("input:checked").id,
    };
}