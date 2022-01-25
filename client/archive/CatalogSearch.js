let searchButton = document.getElementById("search");
let list = document.getElementById("CatalogList");
let area = document.getElementById('main');
function scrollTo(pos) {
    area.scrollBy(0, -1*area.getBoundingClientRect().top + pos - 15);
    // document.querySelector("body").scrollBy(0, -1*area.getBoundingClientRect().top + pos - 15);
    // document.scrollBy(0, pos - 15);
    // document.scrollBy(0, pos - 15);
}

function getGroupByCaption(caption) {
    let group = list.querySelectorAll("dt");

    for (let dt of group) {
        if (dt.innerText === caption) {
            return dt.parentNode.querySelectorAll("dd");
        }
    }
    return {};
}

//-1 if not found
function findElement(value) {
    let caption = value[0];
    const listGroup = getGroupByCaption(caption);

    for (const dd of listGroup) {
        if (value === dd.innerText.substr(0, value.length)) {
            return dd.getBoundingClientRect().top;
        }
    }

    return -1;
}

// let findElement = (temp) => {return -1;}

function handleSearch(event) {
    if (searchButton.value.length < 20 && searchButton.value.length > 0) {
        let pos = findElement(searchButton.value);
        if (pos !== -1) {
            scrollTo(pos);
        }
    } else {
        searchButton.value = searchButton.value.substr(0, 20);
    }
}

searchButton.addEventListener('input', handleSearch);
