const searchForm = document.querySelector('#searchForm')
console.log(searchForm)
searchForm.addEventListener('submit', e => {
  e.preventDefault()
  

  const searchingZipcode = e.target.zipcode.value
  fetch('http://localhost:3000/kitchens/')
    .then(resp => resp.json())
    .then(kitchens => {
      
      //clear kitchenContainer
      renderZipMatchKitchen(kitchens, searchingZipcode)
    })
})

function renderZipMatchKitchen(kitchens, searchingZipcode) {
  const kitchenContainer = document.querySelector(".kitchens");
  kitchenContainer.innerHTML = ''
  let filteredKitchens = kitchens.filter(kitchen => kitchen.location.split('NY ')[1] === searchingZipcode)
  
  if (Array.isArray(filteredKitchens) && filteredKitchens.length===0) {
    renderEmpty(searchingZipcode)
    console.log(filteredKitchens)
  }else{

    filteredKitchens.forEach(kitchen => {
      renderCard(kitchen)
      console.log(kitchen)
    })
  }
}