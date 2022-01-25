export function filterList(list, value) {
    let temp = value.toUpperCase();
    for (let li of list) {
        if (li.innerHTML.toUpperCase().indexOf(temp) > -1) {
            li.style.display = "";
        } else {
            li.style.display = "none";
        }
    }
}
