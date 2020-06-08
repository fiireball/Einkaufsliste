const mainContainer = document.querySelector(".main-container")

let myBasketObj = {}


db.collection('meals').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        myBasketObj = doc.data()
    })
})


const mealFactory = (name, ingredients) => {
    return { name, ingredients };
  };
  


function addMealToBasket(meal) {
  myBasketObj.myBasket.push(meal)
  db.collection('meals').doc('CP925ziIY9Xrv01srXEp').set(myBasketObj)
  render(myBasketObj.myBasket)
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
        div.setAttribute('data-id', myBasketObj.myBasket.indexOf(meal))

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
                myBasketObj.myBasket.splice(parseInt(button.parentElement.dataset.id), 1)
                db.collection('meals').doc('CP925ziIY9Xrv01srXEp').set(myBasketObj)
                render(myBasketObj.myBasket)
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
    addMealToBasket(mealFactory(mealName, ingredientsArr))
})

// const meal3 = mealFactory('Test Meal', ['Suppe', 'Kartoffeln']);

setTimeout(() => {  render(myBasketObj.myBasket); }, 500);


//db.collection('meals').get().then((snapshot) => {
//    snapshot.docs.forEach(doc => {
//        myBasketObj = doc.data()
//    })
//})