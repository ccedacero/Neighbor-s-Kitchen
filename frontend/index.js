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
let totalTax = 0;
let foodOrderIds = [];
let lastOrder = null;
function renderOrder(collapsedDiv) {
  collapsedDiv.innerHTML = `<hr class="mt-4 mb-2">
                            <div class="addedFoods card-body">
                                <h5 class="card-title">Cart</h5>
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
                                        <div class="card-body" data-id = "${food.id}">
                                            <h6 class="foodName font-weight-bold mb-1">${food.name}</h6>
                                            <p class="foodDesc mb-0">${food.description}</p>
                                            <h6 class="foodPrice font-weight-bold mb-1">Price: $${food.price}</h6>
                                            <button type="button" class="addFood btn btn-default float-right" data-target="#collapseList" aria-expanded="false" aria-controls="collapseList">
                                                <i class="fas fa-plus-circle "></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>`;
  });
  foodContainer.addEventListener("click", (event) => {
    const foodUl = displayContainer.querySelector(".foodList");renderCard
    const totalDiv = document.createElement("div");
    
    if (event.target.tagName === "BUTTON") {
      $(collapsedDiv).collapse({
        show: true,
      });
      const kitchenId = parseInt(event.target.closest('.kitchen').dataset.id);
      const foodId = parseInt(event.target.closest(".card-body").dataset.id);
      const foodName = event.target.parentElement.firstElementChild.innerText;
      const foodPrice = parseFloat(event.target.parentElement.children[2].innerText.split("$")[1]);
      const foodSpan = document.createElement('span');
      foodSpan.innerHTML = `<i class="fas fa-trash" style="color:#d9534f"></i>`;
      foodOrderIds.push(foodId)
      // debugger
      // Price Section
      totalPrice += foodPrice;
      //price for one quant of this item 
      let itemTax = parseFloat((foodPrice / 100) * 8.875).toFixed(2);
      let currentItemTax = 0; 
      // let subtotal = totalTax + totalPrice; 
      let matches = document.querySelector(`li[data-id="${foodId}"]`);
      const foodLi = document.createElement("li");
      if (matches) {
       currentItemTax = parseInt(matches.dataset.counter) * itemTax;
       let foodCounter = parseInt(matches.dataset.counter) + 1;
       matches.dataset.counter = foodCounter;
       matches.innerText = `${foodName} $${foodPrice} (${foodCounter})`;
       matches.append(foodSpan)
       itemTax = parseFloat((foodCounter * itemTax) - currentItemTax);
       totalTax = itemTax
       debugger
       removeLi(matches,foodSpan,foodPrice,itemTax)
      } else {
      const foodLi = document.createElement("li");
      foodLi.dataset.counter = 1;
      foodLi.innerText = foodName + " " + "$" + foodPrice +"(1)";
      foodLi.dataset.id = foodId;
      foodLi.append(foodSpan);
      foodUl.append(foodLi);
      // debugger
      itemTax = parseFloat(parseFloat(foodLi.dataset.counter * itemTax));
      totalTax += itemTax
       removeLi(foodLi,foodSpan,foodPrice,itemTax)
      }
      // debugger
      orderSection(event,kitchenId)
      
    }
  });
};

function orderSection(event,kitchenId) {
const priceDiv =event.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild;
priceDiv.innerHTML = `<h6>Order Total: $${totalPrice} <br> Taxes: $${totalTax}<br><hr><strong>Subtotal:$${totalPrice}</strong></h6>`;
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
                <input type="text" id="subtotal" name="subtotal" value=$${totalPrice} disabled><br>
                <input type="submit" class="btn btn-success" value ="Place Order" >
            </fieldset>
        </form>
         <button type="button" class="btn btn-primary editBtn" data-toggle="modal" data-target="#editForm">
  Edit Order
</button>
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

    submitOrder(userObj, totalPrice,kitchenId)
  })
  const editBtn = document.querySelector('.editBtn');
  editOrder(editBtn)
}


function submitOrder(userObj,totalPrice,kitchenId) {
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
.then(userResp => createOrder(userResp,totalPrice,kitchenId))
}
function createOrder(userResp,totalPrice,kitchenId) {
    const date = new Date();
    const orderObj = {
        date: date,
        total_price: totalPrice,
        kitchen_id: kitchenId, 
        user_id: userResp.id , 
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
  createFoodOrderFetch(orderResp.id,order);
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
  fetch('http://localhost:3000/food_orders',foodOrderPayload)
  .then(resp=> resp.json()).then(console.log)   
}

function removeLi(foodLi,foodSpan,foodPrice,taxes) {
  taxes = parseFloat(taxes)
  let subT = 0; 
  foodSpan.addEventListener('click', (e) => {
     const priceSec = e.currentTarget.closest('.addedFoods').querySelector('.totalPrice').firstChild;
    //  get current food price by multipying times quant
     totalPrice = parseFloat(totalPrice - (foodLi.dataset.counter * foodPrice));
    // get current food tax by multiplying times tax  
     itemTax = parseFloat(foodLi.dataset.counter * taxes);
    //  debugger

     if (totalTax !== taxes) {
     totalTax = parseFloat(totalTax -taxes).toFixed(2); 
     debugger
     } else {
       totalTax = 0; 
     }

    if (totalPrice !== 0) {
    subT = parseFloat(taxes + totalPrice);
    } else if(totalPrice === 0) {
     subT = 0;
    } 
    subtotal.value = totalPrice;
        foodLi.remove();
    priceSec.innerHTML = `<h6>Order Total: $${totalPrice} <br> Taxes: $${totalTax}<br><hr><strong>Subtotal:$${subT}</strong></h6>`;
  })
}



function editOrder(editBtn) {
  let form = document.querySelector('#editForm').querySelectorAll('input');
    let name = form[0].value;
    let email = form[1].value;
    let phone = form[2].value;
    let location = form[3].value;
    let subtotal = form[4].value;
    debugger
    editBtn.addEventListener('click', (e) => {  
  fetch(`http://localhost:3000/orders/${lastOrder}`)
  .then(resp => resp.json())
  // .then(lastOrderObj => console.log(lastOrderObj))
  .then(lastOrderObj => {
    console.log(lastOrderObj.user.name,lastOrderObj.user.email,lastOrderObj.total_price)
    // name = lastOrderObj.user.name,
    // emai = lastOrderObj.user.email,
    // phone = lastOrderObj.user.phone,
    // location = lastOrderObj.user.location,
    // subtotal = lastOrderObj.total_price
    // debugger
    })
    })
}
    // const date = new Date();
  
//     const orderPayload = {
//     method: 'POST',
//     // mode: 'cors', // no-cors, *cors, same-origin
//     headers: {
//       'Content-Type': 'application/json'
//     },
//    body: JSON.stringify(orderObj)
// }   
//      fetch('http://localhost:3000/orders', orderPayload)
//      .then(resp => resp.json()).then(orderResp => {
//       createFoodOrder(orderResp)
//      })












 //edit order, remove from list before adding 
 //edit delete order 
 // 