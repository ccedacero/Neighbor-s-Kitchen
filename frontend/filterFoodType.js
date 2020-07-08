const foodTypeDiv = document.querySelector('.foodType')
console.log(foodTypeDiv)

foodTypeDiv.addEventListener('click', e => {
  console.log(e.target.innerText)
  let selectFood = e.target.innerText
  fetch('http://localhost:3000/kitchens/')
    .then(resp => resp.json())
    .then(kitchens => {

      //clear kitchenContainer
      renderFilteredKitchen(kitchens, selectFood)
    })
})

function renderFilteredKitchen(kitchens, selectFood) {
  const kitchenContainer = document.querySelector(".kitchens");
  kitchenContainer.innerHTML = ''
  let filteredKitchens = kitchens.filter(kitchen => kitchen.food_type === selectFood)
  
  if (Array.isArray(filteredKitchens) && filteredKitchens.length===0) {
    renderEmpty(selectFood)
    console.log(filteredKitchens)
  }else{

    filteredKitchens.forEach(kitchen => {
      renderCard(kitchen)
      console.log(kitchen)
    })
  }
}

function renderEmpty(selectFood) {
  const emptyKitchen = document.createElement('div')
  const kitchenContainer = document.querySelector(".kitchens");
  emptyKitchen.className = 'empty-kitchen'

  emptyKitchen.innerHTML = `
    <div class="card border-secondary row-cols-1" >
              <img src="./asset/emptyDish.jpeg" class="card-img" alt="..." >
              <div class="card-img-overlay align-middle">
                <h5 class="card-title ">Sorry, no ${selectFood} neighbor kitchen is here</h5>
              </div>
    </div>
    `
  kitchenContainer.append(emptyKitchen);
  console.log("empty kitchen")
}