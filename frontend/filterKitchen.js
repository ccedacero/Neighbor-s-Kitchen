const searchForm = document.querySelector('#searchForm')
const foodTypeForm = document.querySelector('#foodTypeForm')

class Input {
  constructor(){
    //This will contain key-value pairs.
    this.inputs = {}
  }

  setValue = (key, val)=>{
    this.inputs[key] = val
  }

  getKeys=()=>{
    var result = []
    for (var key in this.inputs) result.push(key)
    return result
  }

  getValue= key =>{
      return this.inputs[key]
  }

  reset = () => {
    this.inputs = {}
  }
}

let inputs = new Input()

searchForm.addEventListener('submit', e => {
  e.preventDefault()
  let zipcode = e.target.zipcode.value
  //inputs.setValue("zipcode", zipcode);
  
  let formNode = e.target.elements
  let formArr = Array.from(formNode)

  //means there is foodType
  if(formArr.filter(node => node.checked === true )[0] !== undefined  ){
    let foodType = formArr.filter(node => node.checked === true )[0].id
    inputs.setValue("foodType", foodType)
  }
  //means there is zipcode
  if (!isNaN(parseInt(zipcode.trim()))){
    inputs.setValue("zipcode", zipcode);
  }
  //reset when only using submit button
  resetFoodTypeStyle()
  searchForm.reset()
  // inputs.reset()

  console.log(inputs)
  fetchKitchens(inputs)
})

foodTypeForm.addEventListener('change', e => {

  let foodType = e.target.id
  
  //style Bootstrap button
  resetFoodTypeStyle()
  e.target.parentElement.className = 'btn btn-secondary active'
  //set foodType to inputs OBJ
  inputs.setValue("foodType", foodType)
  console.log(inputs)
  fetchKitchens(inputs)
  // filterKitchen(inputs)
})



function fetchKitchens(inputsObj) {
  fetch('http://localhost:3000/kitchens/')
    .then(resp => resp.json())
    .then(kitchens => {
      //clear kitchenContainer
      filterKitchen(inputsObj, kitchens)
    })
}

function filterKitchen(inputs,kitchens) {

  const kitchenContainer = document.querySelector(".kitchens");
  kitchenContainer.innerHTML = ''
  let filteredKitchens = kitchens

  if(inputs.inputs.foodType){
    let foodType = inputs.getValue("foodType")
    let FT_filtered = kitchens.filter(kitchen => kitchen.food_type === foodType)
    filteredKitchens = FT_filtered
    if (Array.isArray(filteredKitchens) && filteredKitchens.length===0) {
      renderEmpty(foodType)
      console.log('empty ',filteredKitchens)
      //reset input object when 
      //there is no result
      inputs.reset()
      }
  }

  if(inputs.inputs.zipcode){
    let zipcode = inputs.getValue("zipcode") 
    let ZC_filtered = kitchens.filter(kitchen => kitchen.location.split('NY ')[1] === zipcode)
    filteredKitchens = ZC_filtered
    console.log('zipcodeKitchens ',filteredKitchens)
    if (Array.isArray(filteredKitchens) && filteredKitchens.length===0) {
      renderEmpty(zipcode)
      console.log('empty ', filteredKitchens)
      
    }
    //reset input object when 
    //used submit buttion AKA zipcode
    inputs.reset()
  }

  console.log('finalKitchen ',filteredKitchens)
  filteredKitchens.forEach(kitchen => {
    renderCard(kitchen)
  })
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

function resetFoodTypeStyle() {
  let labelGroup = foodTypeForm.querySelectorAll('label')
  labelGroup.forEach(label => label.className = 'btn btn-secondary')
}

function resetFoodTypeInput() {
  console.log("reset food type input checked to false")
  let inputGroup = foodTypeForm.querySelectorAll('input')
  inputGroup.forEach(input => input.checked = false)
}