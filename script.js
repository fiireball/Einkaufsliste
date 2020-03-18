const lists = document.querySelectorAll('li')

lists.forEach(list => {
    list.addEventListener('click', (e) => {
        list.classList.toggle('erledigt')
    })
})

