// import {default} from "webpack-merge";

// import {doAuthRequest, getGenres} from "../requests";
// import {default} from "webpack-merge";

module.exports = (function () {
    return new class noteValidator {
        isCorrectName(name) {
            return name.length >= 5 && name.length <= 50;
        }

        isCorrectDescription(description) {
            return description.length >= 20 && description.length <= 1000;
        }

        isCorrectProducer(producer) {
            return producer.length >= 5 && producer.length <= 50;
        }

        isCorrectDate(date) {
            if (!date || typeof date !== "string") {
                return false;
            }

            // YYYY-MM format
            const regEx = new RegExp(/[0-9]{4}[\-]{1}[0-9]{2}$/g);
            let temp = date.match(regEx);
            if (!temp || temp[0].length !== date.length) {
                return false;
            }

            temp = date.split("-");
            let year = 1 * temp[0];
            let month = 1 * temp[1];

            return month > 0
                && month <= 12
                && year >= 1800
                && year <= new Date().getFullYear();
        }

        // TODO: refactor poster
        // isCorrectPoster(poster) {
        //     let files = poster.files;
        //     if (files.length > 1) {
        //         return false;
        //     }
        //     let file = files[0];
        //
        //     let name = file.name;
        //     let re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
        //     if (!re.exec(name)) {
        //         return false;
        //     }
        //
        //     if (file.size > 500000) {
        //         return false;
        //     }
        //
        //     const image = createImageBitmap(file);
        //     return image.height === 600 && image.width === 400;
        // }

        async isCorrectGenre(genre) {
            const requests = require('../requests');
            let genres = await requests.getGenres();
            let id = genre.substr(3, genre.length - 3);
            for (let genre of genres.body) {
                if (genre.id.toString() === id.toString()) {
                    return true;
                }
            }
            return false;
        }

        async isCorrectDataWithoutPoster(data) {
            return await this.isCorrectGenre(data.genre)
                && this.isCorrectName(data.name)
                && this.isCorrectDate(data.date)
                && this.isCorrectDescription(data.description)
                && this.isCorrectProducer(data.producer);
        }

        isFilledData(data) {
            return data.name.length
                && data.producer.length
                && data.description.length
                && data.genre.length
                && data.date.length
                && data.name.length > 0
                && data.producer.length > 0
                && data.description.length > 0
                && data.genre.length > 0
                && data.date.length > 0;
        }

        /*
        codes:
        -1: valid
        1: not filled
        2: incorrect data
        */
        async validNoteData(data) {
            if (!this.isFilledData(data)) {
                return 1;
            }
            if (!await this.isCorrectDataWithoutPoster(data)) {
                return 2;
            }

            return -1;
        }
    };
})();
