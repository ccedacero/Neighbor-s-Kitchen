const selectOptions = document.querySelector("#kitchens");
const kitchenMenu = document.querySelector(".kitchen-menu");
let currentGeoLoc = ""
// We need to display the following food cards with the following info: Food Name Description Price Available we don't need to add the kitchen that doesn’t have any available food

//1. Get the container
//2. Create kitchen card
//3, Get information from kitchen(username, description);

fetch("http://localhost:3000/kitchens/")
  .then((resp) => resp.json())
  .then((kitchens) => {
    kitchens.forEach((kitchen) => {
      renderCard(kitchen);
    });
  });

function renderCard(kitchen) {
  const kitchenContainer = document.querySelector(".kitchens");
  const kitchenDiv = document.createElement("div");

  kitchenDiv.className = "kitchen row mb-5";
  // debugger
  kitchenDiv.dataset.id = kitchen.id;
  kitchenDiv.innerHTML += `<div class="card border-secondary row-cols-1" >
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
}

let totalPrice = 0;
// let totalTax = 0;
let foodOrderIds = [];
let lastOrder = null;

function renderOrder(collapsedDiv) {
  collapsedDiv.innerHTML = `<hr class="mt-4 mb-2">
                            <div class="addedFoods card-body text-center">
                              <i class="fas fa-shopping-cart grey-text"></i>
                                <h5 class="card-title" style="font-weight:800; font-size: 2em;">Food Cart Summary</h5>
                                <ul class="foodList">
                                </ul>
                                <div class="totalPrice">
                                </div>
                            </div>`;
}

function renderFood(foodContainer, kitchen, displayContainer, collapsedDiv) {
  kitchen.menu.foods.forEach((food) => {
    foodContainer.innerHTML += `<div class="col-3 p-1">
                                    <div class="card h-100">
                                        <img src=${food.img_src} class="card-img-top" alt="...">
                                        <hr class="m-0">
                                        <div class="card-body d-flex flex-column" data-id = "${food.id}">
                                            <h6 class="foodName font-weight-bold mb-1">${food.name}</h6>
                                            <p class="foodDesc mb-0">${food.description}</p>
                                            <h6 class="foodPrice font-weight-bold mb-1">Price: $${food.price}</h6>
                                            <button type="button" class="addFood btn btn-default mt-auto" data-target="#collapseList" aria-expanded="false" aria-controls="collapseList">
                                                <i class="fas fa-plus-circle  fa-1x" style="color: #fff;"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>`;
  });
  foodContainer.addEventListener("click", (event) => {
    const foodUl = displayContainer.querySelector(".foodList");
    renderCard
    const totalDiv = document.createElement("div");

    if (event.target.tagName === "BUTTON") {
      $(collapsedDiv).collapse("show");
      
      const kitchenId = parseInt(event.target.closest('.kitchen').dataset.id);
      const foodId = parseInt(event.target.closest(".card-body").dataset.id);
      const foodName = event.target.parentElement.firstElementChild.innerText;
      const foodPrice = parseFloat(event.target.parentElement.children[2].innerText.split("$")[1]);
      const foodSpan = document.createElement('span');
      foodSpan.innerHTML = `<i class="fas fa-trash" style="color:#d9534f"></i>`;
      foodOrderIds.push(foodId)
      // debugger
      // Price Section
      totalPrice = totalPrice + foodPrice;
      let taxes = parseFloat((totalPrice / 100) * 8.875).toFixed(2);
      taxes = parseFloat(taxes);
      let subtotal = totalPrice + taxes;
      subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100;
      let matches = document.querySelector(`li[data-id="${foodId}"]`);
      const foodLi = document.createElement("li");
      if (matches) {
       let foodCounter = parseInt(matches.dataset.counter) + 1;
       matches.dataset.counter = foodCounter;
       matches.innerText = `name: ${foodName} | price: $${foodPrice} (x${foodCounter})`;
       matches.append(foodSpan)
      //  totalTax = taxes
      //  debugger
       removeLi(matches,foodSpan,foodPrice)
      } else {
      const foodLi = document.createElement("li");
      foodLi.dataset.counter = 1;
      // foodLi.innerText = foodName + " " + "$" + foodPrice +"(1)";
      foodLi.innerText =`name: ${foodName} | price: $${foodPrice}(1)`;
      // name: Bruschette with Tomato | price: 19.0

      foodLi.dataset.id = foodId;
      foodLi.append(foodSpan);
      foodUl.append(foodLi);
      // debugger
       removeLi(foodLi,foodSpan,foodPrice)
      }
      // debugger
      orderSection(event,kitchenId,taxes,subtotal)
    }
  });
};

function orderSection(event,kitchenId,taxes,subtotal) {
  // debugger
const priceDiv =event.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild;
priceDiv.innerHTML = `<h6>Order Total: $${totalPrice} <br> Taxes: $${taxes}<br><hr><strong>Subtotal:$${subtotal}</strong></h6>`;
priceDiv.innerHTML += `<div class="testForm container row justify-content-center">
            <div class="form-group form-group-sm">
        <form class="order-form"method="post">
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
    const userObj = {
      name: event.target.name.value,
      location: event.target.location.value,
      email: event.target.email.value,
      phone: event.target.phone.value
    }
      $(event.target.closest('#collapseList')).collapse("hide");
      form.reset()
      
      event.target.closest(".addedFoods").querySelector(".foodList").innerHTML = "";
    submitOrder(userObj, totalPrice, kitchenId)
  })
  const editBtn = document.querySelector('.editBtn');
  // editOrder(editBtn)

}



function submitOrder(userObj, totalPrice, kitchenId) {
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
    .then(userResp => createOrder(userResp, totalPrice, kitchenId))
}

function createOrder(userResp, totalPrice, kitchenId) {
  const date = new Date();
  const orderObj = {
    date: date,
    total_price: totalPrice,
    kitchen_id: kitchenId,
    user_id: userResp.id,
  }
  // debugger
  const orderPayload = {
    method: 'POST',
    // mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderObj)
  }
  fetch('http://localhost:3000/orders', orderPayload)
    .then(resp => resp.json()).then(orderResp => {
      // console.log(orderResp)
      createFoodOrder(orderResp)
      lastOrder = orderResp.id;
    })
}

function createFoodOrder(orderResp) {
  foodOrderIds.forEach(order => {
    createFoodOrderFetch(orderResp.id, order);
  })
}

function createFoodOrderFetch(orderId, foodId) {
  foodOrderObj = {
    order_id: orderId,
    food_id: foodId
  }
  const foodOrderPayload = {
    method: 'POST',
    // mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(foodOrderObj)
  }
  fetch('http://localhost:3000/food_orders', foodOrderPayload)
    .then(resp => resp.json()).then(console.log)
}

function removeLi(foodLi, foodSpan, foodPrice, taxes) {
  taxes = parseFloat(taxes)
  foodSpan.addEventListener('click', (e) => {
     const priceSec = e.currentTarget.closest('.addedFoods').querySelector('.totalPrice').firstChild;
     subtotalField = document.querySelector('.order-form').querySelector('#subtotal');

    //  get current food price by multipying times quant
    totalPrice = parseFloat(totalPrice - (foodLi.dataset.counter * foodPrice));
    // get current food tax by multiplying times tax  
      taxes = parseFloat((totalPrice / 100) * 8.875).toFixed(2)
      
      subtotal = parseFloat(totalPrice + parseFloat(taxes))
      subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100
      subtotalField.value = subtotal;
      
      foodLi.remove();
      
    priceSec.innerHTML = `<h6>Order Total: $${totalPrice} <br> Taxes: $${taxes}<br><hr><strong>Subtotal:$${subtotal}</strong></h6>`;
  })
}

const editBtn = document.querySelector('.editBtn');
editBtn.addEventListener('click', (e) => {
  
  let form = document.querySelector('#editForm').querySelectorAll('input');
  const username = document.querySelector('#editUsername')
  const subtotal = document.querySelector('h6#subtotal')
  fetch(`http://localhost:3000/orders/${lastOrder}`)
    .then(resp => resp.json())
    .then(lastOrderObj => {
      
      // setTimeout(2000)
      form[0].value = lastOrderObj.user.phone
      form[1].value = lastOrderObj.user.location
      username.textContent = `User: ${lastOrderObj.user.name}`;
      subtotal.textContent = `Order Total $${lastOrderObj.total_price}`;

      //find unique food and count that
      let uniqeFoodCount = {}
      lastOrderObj.foods.forEach( food => uniqeFoodCount[food.name] = (uniqeFoodCount[food.name]||0) +1)

      //render ordered food list
      renderFoodOrders(lastOrderObj, uniqeFoodCount)
    })
})

//render ordered food list
function renderFoodOrders(lastOrderObj, uniqeFoodCount){
  
  const foodOrderList = document.querySelector('#foodOrderList ul')
  let orderedFoods = lastOrderObj.foods
  foodOrderList.innerHTML = ''

  for(let key in uniqeFoodCount){
    let foodName = key
    let count = uniqeFoodCount[key]
    let foodObj = orderedFoods.find(food => food.name === foodName)
    let foodLi = document.createElement('li')
    foodLi.innerHTML =`Order item: ${foodObj.name} | price: $<span class="priceSpan">${foodObj.price}</span><br>Quantity: `
    let countInput = document.createElement('input');
    countInput.name = "count";
    countInput.value = count

    foodLi.append(countInput)
    foodOrderList.append(foodLi)

    }
  const submitForm = document.querySelector('#modalEdit');
  submitForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    let arr = [...event.target.querySelectorAll("#foodOrderList li")];
    let total = arr.map(e => {
      var price = parseFloat(e.querySelector("span").innerText);
      var count = parseFloat(e.querySelector("input").value);
      var total = price * count; 
      // debugger
      console.log('inside total array----before parse float ', e.querySelector("input").value)
      console.log("inside total array----",price, count, total)
        return total 
        
    }).reduce((v,a)=> a +v)

   
    const editObj = {
      total_price: total
    }
    editFetch(editObj,lastOrderObj)
    
    $('#editForm').modal('hide');
  })
  const deleteBtn = document.querySelector("#delete");
  deleteBtn.addEventListener("click", (e) => {
    // e.preventDefault()
    const submitForm = document.querySelector('#modalEdit');

    //reseting the form
    submitForm.reset()
    const username = document.querySelector('#editUsername')
    const subtotal = document.querySelector('h6#subtotal')
    const foodOrderList = document.querySelector('#foodOrderList ul')
    username.textContent = `User: `;
    subtotal.textContent = `Order Total $`;
    foodOrderList.innerHTML = ''
    //reseting the form
    
    
    const deleteObj = {
    method: 'DELETE',
    // mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`http://localhost:3000/orders/${lastOrderObj.id}`, deleteObj)
  .then(r => r.json()).then(console.log)
  })
}
  
  function editFetch(editObj,lastOrderObj) {
  //  debugger
  const editOrderPayload = {
    method: 'PATCH',
    // mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editObj)
  }
  
  fetch(`http://localhost:3000/orders/${lastOrderObj.id}`,editOrderPayload)
    .then(resp => resp.json()).then(console.log)
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const searchForm = document.querySelector('#searchForm')
  console.log(position.coords.latitude, position.coords.longitude);
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCbRziLV8j59Uv2bA1akJ4idLqVRC2R5lc`)
  .then(resp=> resp.json()).then(locationObj => {
    console.log(parseInt(locationObj.results[0].address_components[7].long_name))
    currentGeoLoc = locationObj.results[0].address_components[7].long_name
    searchForm.querySelector('input[name = zipcode]').value = currentGeoLoc
  })
}

