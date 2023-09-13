export let moviesList = null
export let inputSearch = null
export let triggerMode = false

const createElement = ({
                           type,
                           attr = {},
                           container = null,
                           position = 'append',
                           event = null,
                           handler = null,
                       }) => {
    const el = document.createElement(type)
    Object.keys(attr).forEach(key => {
        if (key === 'innerHTML') el.innerHTML = attr[key]
        else el.setAttribute(key, attr[key])
    })

    if (container && position === 'append') container.append(el)
    if (container && position === 'prepend') container.prepend(el)
    if (event && handler && typeof handler === 'function') el.addEventListener(event, handler)

    return el
}

export const createStyle = () => {
    createElement({
        type: 'style',
        attr: {
            innerHTML: `
    * {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: "Arial Narrow";
}

.container {
    width: min(100% - 40px, 1280px);
    margin-inline: auto;
}

.movies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.movie {
    display: flex;
    align-content: center;
    justify-content: center;
}

.movie__image {
    width: 100%;
    object-fit: cover;
}

.search {
    margin-bottom: 30px;
}

.search__label-input {
    display: block;
    margin-bottom: 7px;
}

.search__input {
    display: block;
    max-width: 400px;
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid lightsalmon;
}

.search__label-checkbox {
    font-size: 0.8rem;
}

.search__group-checkbox {
    display: flex;
    gap: 5px;
    align-items: center;
}`,

        },
        container: document.head
    })
}

export const createMarkup = () => {

    const container = createElement({
        type: 'div',
        attr: {
            class: 'container'
        },
        container: document.body,
        position: 'prepend',
    })

    createElement({
        type: 'h1',
        attr: {innerHTML: 'Застосунок для пошуку фільмів'},
        container,
    })

    const searchBox = createElement({
        type: 'div',
        attr: {class: 'search'},
        container,
    })

    const inputBox = createElement({
        type: 'div',
        attr: {class: 'search__group search__group--input'},
        container: searchBox,
    })

    const checkBox = createElement({
        type: 'div',
        attr: {class: 'search__group search__group--checkbox'},
        container: searchBox,
    })

    createElement({
        type: 'label',
        attr: {
            for: 'search',
            class: 'search__label-input',
            innerHTML: 'Пошук фільмів'
        },
        container: inputBox,
    })

    inputSearch = createElement({
        type: 'input',
        attr: {
            id: "search",
            class: 'search__input',
            type: 'search',
            placeholder: 'Почніть вводити текст....'
        },
        container: inputBox,
    })

    createElement({
        type: 'input',
        attr: {
            id: 'checkbox',
            class: 'search__checkbox"',
            type: 'checkbox',
            placeholder: 'Почніть вводити текст....'
        },
        container: checkBox,
        event: 'click',
        handler: () => triggerMode = !triggerMode,
    })

    createElement({
        type: 'label',
        attr: {
            for: 'checkbox',
            class: 'search__label-checkbox"',
            innerHTML: 'Додавати фільми до вже існуючого переліку',
        },
        container: checkBox,
    })
    moviesList = createElement({
        type: 'div',
        attr: {class: 'movies'},
        container,
    })
}

export const addMovieToList = (movie) => {
    const item = createElement({
        type: 'div',
        attr: {class: 'movie'},
        container: moviesList,
        position: 'prepend'
    })
    createElement({
        type: 'img',
        attr: {
            class: 'movie__image',
            src: /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : "img/icons8-404-cтраница-не-найдена-64.png",
            alt: `${movie.Title} ${movie.Year}`,
            title: `${movie.Title} ${movie.Year}`,
        },
        container: item
    })
}

export const clearMovieMarkup = el => el && (el.innerHTML = '')