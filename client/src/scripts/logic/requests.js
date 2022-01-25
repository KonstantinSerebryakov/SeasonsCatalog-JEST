module.exports = (function () {
    return new class requests {

        async doSimpleRequestWithBody(method = 'POST', url = '', data = {}) {
            let response = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            return {
                status: response.status,
                body: null
            };
        }


        async doSimpleRequestNoBody(method = 'GET', url = '') {
            let response = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (method === 'GET') {
                return {
                    status: response.status,
                    body: await response.json()
                };
            } else if (method === 'DELETE') {
                return {
                    status: response.status,
                    body: null
                };
            }
        }


        async doAuthRequest(data) {
            const url = 'http://127.0.0.1:3000/admin/auth';
            const method = 'POST';

            let response = await this.doSimpleRequestWithBody(method, url, data);
            return response.status;
        }

        async postNote(data) {
            let url = 'http://127.0.0.1:3000/catalog/addNote';
            const method = 'POST';

            return await this.doSimpleRequestWithBody(method, url, data);
        }


        async deleteNote(id) {
            let url = 'http://127.0.0.1:3000/catalog/deleteNote/' +
                +id.toString();
            const method = 'DELETE';

            return await this.doSimpleRequestNoBody(method, url);
        }

        async putNote(data) {
            let url = 'http://127.0.0.1:3000/catalog/addNote';
            const method = 'PUT';

            return await this.doSimpleRequestWithBody(method, url, data);
        }

        async getNoteTitles() {
            const url = 'http://127.0.0.1:3000/catalog/getTitles';
            const method = 'GET';

            return await this.doSimpleRequestNoBody(method, url);
        }

        async getFullNote(id) {
            let url = 'http://127.0.0.1:3000/catalog/getNote/' +
                +id.toString();
            const method = 'GET';

            return await this.doSimpleRequestNoBody(method, url);
        }

        async getGenres() {
            let url = 'http://127.0.0.1:3000/catalog/getGenres';
            const method = 'GET';

            return await this.doSimpleRequestNoBody(method, url);
        }
    };
})();
