const selectOptions = document.querySelector("#kitchens");
const kitchenMenu = document.querySelector(".kitchen-menu");

// We need to display the following food cards with the following info: Food Name Description Price Available we don't need to add the kitchen that doesn’t have any available food

//1. Get the container
//2. Create kitchen card
//3, Get information from kitchen(username, description);

fetch("http://localhost:3000/kitchens/")
  .then((resp) => resp.json())
  .then((kitchens) => {
    console.log(kitchens);
    kitchens.forEach((kitchen) => {
      renderCard(kitchen);
    });
  });

function renderCard(kitchen) {
<<<<<<< HEAD
  const kitchenContainer = document.querySelector(".kitchens");
  const kitchenDiv = document.createElement("div");
  kitchenDiv.className = "kitchen row mb-5";
  // debugger
  kitchenDiv.dataset.id = kitchen.id;
  kitchenDiv.innerHTML += `<div class="card border-secondary row-cols-1" >
=======

    const kitchenContainer = document.querySelector(".kitchens");
    const kitchenDiv = document.createElement('div');
    kitchenDiv.className = "kitchen row mb-5";
    // debugger 
    kitchenDiv.dataset.id = kitchen.id;
    kitchenDiv.innerHTML +=
        `<div class="card border-secondary row-cols-1" >
>>>>>>> 83ec2bfd5812abd6c75cf269bf7100cd9792803d
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
<<<<<<< HEAD
      </div>`;
  const foodContainer = kitchenDiv.querySelector(".foods");
  const displayContainer = kitchenDiv.querySelector(".foodContainer");
  const collapsedDiv = document.createElement("div");
  collapsedDiv.className = "collapse";
  collapsedDiv.id = "collapseList";
  renderFood(foodContainer, kitchen, displayContainer, collapsedDiv);
  renderOrder(collapsedDiv);
  displayContainer.append(collapsedDiv);
  kitchenContainer.append(kitchenDiv);
=======
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

>>>>>>> 83ec2bfd5812abd6c75cf269bf7100cd9792803d
}

let totalPrice = 0;

function renderOrder(collapsedDiv) {
<<<<<<< HEAD
  collapsedDiv.innerHTML = `<hr class="mt-4 mb-2">
=======
    collapsedDiv.innerHTML = `<hr class="mt-4 mb-2">
>>>>>>> 83ec2bfd5812abd6c75cf269bf7100cd9792803d
                            <div class="addedFoods card-body">
                                <h5 class="card-title">Cart</h5>
                                <ul class="foodList">
                                </ul>
                                <div class="totalPrice">
                                </div>
                            </div>`;
}
<<<<<<< HEAD
function renderFood(foodContainer, kitchen, displayContainer, collapsedDiv) {
  kitchen.menu.foods.forEach((food) => {
    foodContainer.innerHTML += `<div class="col-3 p-1">
=======

function renderFood(foodContainer, kitchen, displayContainer, collapsedDiv) {
    kitchen.menu.foods.forEach((food) => {
        foodContainer.innerHTML += `<div class="col-3 p-1">
>>>>>>> 83ec2bfd5812abd6c75cf269bf7100cd9792803d
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
<<<<<<< HEAD
                                </div>`;
  });
  foodContainer.addEventListener("click", (event) => {
    const foodUl = displayContainer.querySelector(".foodList");
    const totalDiv = document.createElement("div");

    if (event.target.tagName === "BUTTON") {
      $(collapsedDiv).collapse({
        show: true,
      });
      const kitchenId = parseInt(event.target.closest('.kitchen').dataset.id);
      const foodId = parseInt(event.target.closest(".card-body").dataset.id);
      const foodName = event.target.parentElement.firstElementChild.innerText;
      const foodPrice = parseFloat(
        event.target.parentElement.children[2].innerText.split("$")[1]
      );
      totalPrice += foodPrice;
      const foodLi = document.createElement("li");
      foodLi.innerText = foodName + " " + "$" + foodPrice;
      foodUl.append(foodLi);
      // Price Section
      let taxes = parseFloat((totalPrice / 100) * 8.875).toFixed(2);
      let subtotal = parseFloat(taxes) + totalPrice; 
      orderSection(event,taxes,subtotal,kitchenId)
    
    }
  });
};

function orderSection(event,taxes,subtotal,kitchenId) {
const priceDiv =event.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild;
priceDiv.innerHTML = `<h6>Order Total: $${totalPrice} <br> Taxes: $${taxes}<br><hr><strong>Subtotal:$${subtotal}</strong></h6>`;
priceDiv.innerHTML += `<div class="testForm container row justify-content-center">
            <div class="form-group form-group-sm">
        <form class="order-form "method="post">
            <fieldset>
                <label for="name" id="name-label">Name:</label>
                <input type="text" name="name" id="name" placeholder="Enter your Name" required><br>
                <label for="email" id="email-label">Email:</label>
                <input type="email" name="email" type="text" id="email" placeholder="Enter your Email" required><br>
                <label for="number" id="number-label">Phone:</label>
                <input type="tel" id="number" name="phone" placeholder="Phone Number" required max="99" min="1"><br>
                <label for="location" id="location-label">Location:</label>
                <input type="text" id="location" name="location" placeholder="Address"><br>
                <label for="subtotal" id="subtotal-label">Subtotal:</label>
                <input type="text" id="subtotal" name="subtotal" value=$${subtotal} disabled><br>
                <input type="submit" class="btn btn-success" value ="Place Order" >
            </fieldset>
        </form>
        </div>
        </div>`
const form = priceDiv.querySelector(".order-form");
form.addEventListener('submit', (event) => {
    event.preventDefault()
    // debugger
    const userObj = {
        name: event.target.name.value,
        location: event.target.location.value,
        email: event.target.email.value,
        phone: event.target.phone.value
    }

    submitOrder(userObj, subtotal,kitchenId)
  })
}
=======
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



>>>>>>> 83ec2bfd5812abd6c75cf269bf7100cd9792803d

function submitOrder(userObj,subtotal,kitchenId) {
const payLoad = {
    method: 'POST',
    // mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },
   body: JSON.stringify(userObj)
}
fetch('http://localhost:3000/users', payLoad)
.then(resp => resp.json())
.then(resp => createOrder(resp,subtotal,kitchenId))
}

function createOrder(resp,subtotal,kitchenId) {
    const date = new Date();
    const orderObj = {
        date: date,
        total_price: subtotal,
        kitchen_id: kitchenId, 
        user_id: resp.id , 
    }

    const orderPayload = {
    method: 'POST',
    // mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },
   body: JSON.stringify(orderObj)
}   
     fetch('http://localhost:3000/orders', orderPayload)
     .then(resp => resp.json()).then(console.log)
    
}













// selectOptions.addEventListener("change", (e) => {
//   const name = e.target.value;
//   const id = parseInt(find_id(name).dataset.id);
//   let foodDiv = manageVisibility(id);
//   foodDiv.style.display = "block";
// });

// function manageVisibility(id) {
//   const menu = [...document.querySelectorAll(".menu")];
//   let instance = menu.find((food) => {
//     return parseInt(food.dataset.id) === id;
//   });
//   return instance;
// }

// function find_id(name) {
//   const kitchenOptions = [...document.querySelectorAll("option")];
//   return kitchenOptions.find((o) => o.value === name);
// }

// function filter_available(kitchen) {
//   availableMenu = kitchen.menu.foods.map((food) => {
//     return food.availability === true;
//   });
//   return availableMenu;
// }
