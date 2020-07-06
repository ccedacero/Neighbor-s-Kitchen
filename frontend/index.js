const selectOptions = document.querySelector("#kitchens");
const kitchenMenu = document.querySelector(".kitchen-menu");
fetch('http://localhost:3000/kitchens/')
    .then(resp => resp.json())
    .then(kitchens => {
        console.log(kitchens)
        kitchens.forEach(kitchen => {
            renderCard(kitchen)
        })
    })

function renderCard(kitchen) {
    let availability = filter_available(kitchen)
    const card = document.createElement('div');
    card.className = 'card';
    const username = document.createElement('h3');
    const foodType = document.createElement('h5');
    const location = document.createElement('p');
    const description = document.createElement('p');
    const foodImage = document.createElement('img');
    const selectOpt = document.createElement('option');
    const menuDate = document.createElement('h6');
    const menuName = document.createElement('h6');
    const menuDescription = document.createElement('p');
    const menuInput = document.createElement('input');
    const menuSpan = document.createElement('span');
    const menuDiv = document.createElement('div');
    menuDiv.className = "menu";
    menuDiv.dataset.id = kitchen.id;
    menuSpan.textContent = "Add to cart";
    menuInput.type = "checkbox";
    menuInput.value = kitchen.menu.foods[0].name;
    menuDate.textContent = kitchen.menu.foods[0].date;
    menuName.textContent = kitchen.menu.foods[0].name;
    menuDescription.textContent = kitchen.menu.foods[0].description;
    selectOpt.value = kitchen.username
    selectOpt.dataset.id = kitchen.id;
    selectOpt.textContent = kitchen.username;
    foodImage.src = kitchen.menu.foods[0].img_src;
    username.textContent = kitchen.username;
    foodType.textContent = kitchen.food_type;
    location.textContent = kitchen.location;
    description.textContent = kitchen.description;
    // if (availability[0] === true) {
    menuDiv.append(menuInput, menuSpan, menuDate, menuName, menuDescription);
    kitchenMenu.append(menuDiv);
    menuDiv.style.display = "none";
    // }
    // card.append(username,foodType,location,description,foodImage);
    // <option value="Restaurant">Restaurant</option>
    selectOptions.append(selectOpt);
    // document.body.append(card);
    // document.body.append(card);
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