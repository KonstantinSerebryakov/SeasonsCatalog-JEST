export function getPageIdParameter() {
    let url = new URL(document.location.href.toString());
    return url.searchParams.get('id');
}