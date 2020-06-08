const mainContainer = document.querySelector(".main-container")




let myBasket = [
                {name: "Pizza", ingredients: ["Mehl", "Oliven Öl", "Hefe"]},
                {name: "Bratkartoffeln", ingredients: ["Festkochende Kartoffeln", "Butter", "Zwiebel", "Speck"]}
            ];

function Meal(name, ingredients) {
  this.name = name;
  this.ingredients = ingredients;
}

function addMealToBasket(meal) {
  myBasket.push(meal)
  render(myBasket)
}

function render(BasketArray) {

    clearElements()

    BasketArray.forEach(meal => {
        const div = document.createElement('div')
        const unsortedList = document.createElement('ul')
        const h2 = document.createElement('h2')
        const deleteIcon = document.createElement('i')
        const button = document.createElement('button')

        div.classList.add('einkaufsliste')
        div.setAttribute('data-id', myBasket.indexOf(meal))

        h2.textContent = meal.name
        deleteIcon.classList.add('material-icons', 'delete-icon')
        deleteIcon.textContent = "delete"
        mainContainer.appendChild(div)

        div.appendChild(deleteIcon)
        div.appendChild(h2)
        div.appendChild(unsortedList)


        meal.ingredients.forEach(ingredient => {
            const listItem = document.createElement("li")
            listItem.textContent = ingredient
            unsortedList.appendChild(listItem)
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-icon')

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            areYouSure = window.confirm(`Delete ${button.nextSibling.textContent} from the list?`)
            if (areYouSure) {
                myBasket.splice(parseInt(button.parentElement.dataset.id), 1)
                render(myBasket)
        }
    })
})

}

function clearElements(){
    firstElement = mainContainer.firstElementChild;

    while (firstElement){
        firstElement.remove();
        firstElement = mainContainer.firstElementChild;
    }
}

const showFormButton = document.querySelector('#plus-button')
const form = document.querySelector('.form')
const showFormButtonIcon = document.querySelector('#add-circle')

showFormButton.addEventListener('click', () => {
    form.classList.toggle('hidden')
    if (showFormButtonIcon.textContent == "add_circle") {
        showFormButtonIcon.textContent = "remove_circle"
    } else {
        showFormButtonIcon.textContent = "add_circle"
    }
})


const addMealButton = document.querySelector('#add-meal')

addMealButton.addEventListener('click', () => {
    const mealName = document.querySelector('#meal').value
    const ingredientsArr = document.querySelector('#ingredients').value.split(', ')
    addMealToBasket(new Meal(mealName, ingredientsArr))

})


render(myBasket)

