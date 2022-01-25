(function () {
    const list = document.getElementById('catalogList');

    function navigationHandler(event) {
        let target = event.target;

        if (target.tagName === 'LI') {
            let id = target.id;

            let url = new URL('./pages.html', document.location.href);
            url.searchParams.append('id', id);

            document.location.href = url;
        }
    }

    list.addEventListener('click', navigationHandler);
})()
