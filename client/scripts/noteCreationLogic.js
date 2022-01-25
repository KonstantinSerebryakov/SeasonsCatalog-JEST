(function () {
    // form
    const form = document.getElementById('noteForm');
    // main fields
    const name = document.getElementById('name');
    const poster = document.getElementById('poster');
    const genre = document.getElementById('genre');
    const producer = document.getElementById('producer');
    const description = document.getElementById('description');
    const date = document.getElementById('date');

    function isGenreSelected() {
        let count = genre.querySelectorAll("input:checked").length;
        return count > 0;
    }

    function getSelectedGenresIDs() {
        let selected = genre.querySelectorAll("input:checked")

        let IDs = [];
        for (let i = 0; i < selected.length; i++) {
            IDs.push(selected[i].id);
        }
        return IDs;
    }

    function createNote() {
        let note = new {
            name: name,
            poster: poster,
            genre: getSelectedGenresIDs(),
            date: date.value,
            producer: producer,
            description: description
        }
    }

    function isFieldsFilled() {
        return name.value.length > 0
            && poster.value.length > 0
            && producer.value.length > 0
            && description.value.length > 0
            && isGenreSelected()
            && poster.value !== "";
    }

    function isCorrectName() {
        return name.value.length >= 5 && name.value.length <= 50;
    }

    function isCorrectDescription() {
        return description.value.length >= 20 && description.value.length <= 5000;
    }

    function isCorrectProducer() {
        return producer.value.length >= 5 && producer.value.length <= 50;
    }

    function isCorrectDate() {
        let temp = date.value.split("-");
        let year = 1 * temp[0];
        let month = 1 * temp[1];

        return month >= 0
            && month <= 12
            && year >= 1800
            && year <= new Date().getFullYear();
    }

    function isCorrectPoster() {
        let files = poster.files;
        if (files.length > 1) {
            return false;
        }
        let file = files[0];

        let name = file.name;
        let re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
        if (!re.exec(name)) {
            return false;
        }

        if (file.size > 500000) {
            return false;
        }

        const image = createImageBitmap(file);
        return image.height === 600 && image.width === 400;
    }

    function isCorrectFormData() {
        return isCorrectName()
            && isCorrectDate()
            && isCorrectDescription()
            && isCorrectPoster()
            && isCorrectProducer();
    }

    function validNoteForm() {
        if (!isFieldsFilled()) {
            alert("все поля должны быть заполнены")
            return false;
        }

        if (!isCorrectFormData()) {
            alert("проверьте введенные вами данные")
            return false;
        }

        //TODO: check if this name is used DB!!!

        return true;
    }

    function doPostRequest(url = '', data = {}) {
        let response = fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // credentials: 'include',
            body: JSON.stringify(data),
        });
        return response.status;
    }

    function formHandler(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        let isValid = validNoteForm();
        if (!isValid) {
            return;
        }

        let note = createNote();

        //TODO: connect to server
        let status = doPostRequest("", note);

        if (status === 200) {
            //TODO: show message that operation successful AND redirect back
        }
        else {
            alert("произошла ошибка при добавлении записи");
        }
    }

    function synchronizeGenres(e) {

    }


    document.addEventListener('load', synchronizeGenres);

    form.addEventListener('submit', formHandler);
})()
