export function catalogNavigationHandler(e) {
    let target = e.target;
    if (target.tagName === 'LI') {
        let id = target.id;

        let url = new URL('page.html', document.location.href);
        url.searchParams.append('id', id);

        document.location.href = url;
    }
}