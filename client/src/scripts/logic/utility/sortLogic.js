export function sortArrayOfNotesByNameLogic(a, b) {
    const left = a.title.toLowerCase();
    const right = b.title.toLowerCase();

    if (left > right) return 1;
    else if (left < right) return -1;
    else if (left === right) return 0;
}
