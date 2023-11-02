import {
    createStyle,
    inputSearch,
    clearMovieMarkup,
    createMarkup,
    addMovieToList,
    moviesList,
    triggerMode
} from "./dom.js";

const getData = url => fetch(url)
    .then(res => res.json())
    .then(data => data.Search)


let searchLast = null

const debounceTime = (() => {
    let timer = null
    return (cb, ms) => {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(cb, ms)
    }
})()

const inputSearchHandler = (e) => {
    debounceTime(() => {
        const searchString = e.target.value.trim()

        if (!searchString || searchString.length < 4 || searchString === searchLast) return
        if (!triggerMode) clearMovieMarkup(moviesList)

        getData(`https://www.omdbapi.com/?i=tt3896198&apikey=bb1ff588&s=${searchString}`)
            .then(movies => movies.forEach(movie => addMovieToList(movie)))
            .catch(err => console.log(err))

        searchLast = searchString
    }, 2000)
}

export const init = () => {
    createStyle()
    createMarkup()
    inputSearch.addEventListener('input', inputSearchHandler)
}