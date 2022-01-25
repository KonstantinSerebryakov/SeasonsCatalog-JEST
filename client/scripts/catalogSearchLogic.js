(function () {
    const list = document.getElementById('catalogList');

    const searchInput = document.getElementById('search');

    function filterList(list, value) {
        for (let li of list) {
            if (li.innerHTML.toUpperCase().indexOf(value) > -1) {
                li.style.display = "";
            } else {
                li.style.display = "none";
            }
        }
    }

    function handleSearch(event) {
        let listElements = list.getElementsByTagName('li');
        let filterValue = searchInput.value.toString().toUpperCase();
        filterList(listElements, filterValue);
        console.log('lol');
    }

    searchInput.addEventListener('input', handleSearch)
})()