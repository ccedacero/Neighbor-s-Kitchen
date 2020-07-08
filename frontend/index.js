const selectOptions = document.querySelector("#kitchens");
const kitchenMenu = document.querySelector(".kitchen-menu");

// We need to display the following food cards with the following info: Food Name Description Price Available we don't need to add the kitchen that doesn’t have any available food


//1. Get the container 
//2. Create kitchen card 
//3, Get information from kitchen(username, description);



fetch('http://localhost:3000/kitchens/')
    .then(resp => resp.json())
    .then(kitchens => {
        console.log(kitchens)
        kitchens.forEach(kitchen => {
            renderCard(kitchen)
        })
    })

function renderCard(kitchen) {

    const kitchenContainer = document.querySelector(".kitchens");
    const kitchenDiv = document.createElement('div');
    kitchenDiv.className = "kitchen row mb-5";
    // debugger 
    kitchenDiv.dataset.id = kitchen.id;
    kitchenDiv.innerHTML +=
        `<div class="card border-secondary row-cols-1" >
        <div class="row no-gutters">
            <div class="kitchenImg">
                <img src=${kitchen.img_src} class="card-img-top card-img-wide" alt="..." >
            </div>
            <div class="col-md-12">
                <div class="kitchenInfo card-body">
                    <h5 class="card-title">${kitchen.username}</h5>
                    <p class="card-text">${kitchen.description}</p>
                </div>
            <hr class="my-2">
                <div class="foodContainer card-body"> 
                    <div class="row foods">
                    </div>
               </div>
          </div>
        </div>
      </div>`
    const foodContainer = kitchenDiv.querySelector(".foods");
    const displayContainer = kitchenDiv.querySelector(".foodContainer");
    const collapsedDiv = document.createElement('div');
    collapsedDiv.className = "collapse";
    collapsedDiv.id = 'collapseList';
    renderFood(foodContainer, kitchen, displayContainer, collapsedDiv);
    renderOrder(collapsedDiv);
    displayContainer.append(collapsedDiv);
    kitchenContainer.append(kitchenDiv);

}









function renderOrder(collapsedDiv) {
    collapsedDiv.innerHTML = `<hr class="mt-4 mb-2">
                            <div class="addedFoods card-body">
                                <h5 class="card-title">Cart</h5>
                                <ul class="foodList">
                                </ul>
                            </div>`
}

function renderFood(foodContainer, kitchen, displayContainer, collapsedDiv) {
    kitchen.menu.foods.forEach((food) => {
        foodContainer.innerHTML += `<div class="col-3 p-1">
                                    <div class="card h-100">
                                        <img src=${food.img_src} class="card-img-top" alt="...">
                                        <hr class="m-0">
                                        <div class="card-body" data-id = "${food.id}">
                                            <h6 class="foodName font-weight-bold mb-1">${food.name}</h6>
                                            <p class="foodDesc mb-0">${food.description}</p>
                                            <h6 class="foodPrice font-weight-bold mb-1">Price: $${food.price}</h6>
                                            <button type="button" class="addFood btn btn-default float-right" data-target="#collapseList" aria-expanded="false" aria-controls="collapseList">
                                                <i class="fas fa-utensils "></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>`
    })
    foodContainer.addEventListener('click', (event) => {
        const foodUl = displayContainer.querySelector('.foodList');
        if (event.target.tagName === 'BUTTON') {

            $(collapsedDiv).collapse({
                show: true
            })
            const id = parseInt(event.target.closest('.card-body').dataset.id);
            const foodName = event.target.parentElement.firstElementChild.innerText;
            const foodPrice = parseFloat(event.target.parentElement.children[2].innerText.split('$')[1]);
            const foodLi = document.createElement('li');
            foodLi.innerText = foodName + ' ' + foodPrice;
            foodUl.append(foodLi);
        }
    })
}


















selectOptions.addEventListener('change', (e) => {
    const name = e.target.value
    const id = parseInt(find_id(name).dataset.id);
    let foodDiv = manageVisibility(id);
    foodDiv.style.display = "block";
})

function manageVisibility(id) {
    const menu = [...document.querySelectorAll('.menu')];
    let instance = menu.find((food) => {
        return parseInt(food.dataset.id) === id
    })
    return instance
}

function find_id(name) {
    const kitchenOptions = [...document.querySelectorAll('option')];
    return kitchenOptions.find((o) => o.value === name);
}

function filter_available(kitchen) {
    availableMenu = kitchen.menu.foods.map((food) => {
        return food.availability === true
    })
    return availableMenu
}