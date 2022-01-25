import {getGenres} from '../../logic/requests';
import {fillGenresBlock} from '../../logic/list/noteDataFiller';

export function getGenresHandler(e) {
    const genres = getGenres();

    const genreBlock = document.getElementById('genre');
    fillGenresBlock(genreBlock, genres);
}