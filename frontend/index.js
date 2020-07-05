fetch('http://localhost:3000/kitchens/')
  .then(resp => resp.json())
  .then(kitchens => {
    console.log(kitchens)
    kitchens.forEach(kitchen => {
      renderCard(kitchen)
      })
    })

function renderCard(kitchen){
  const card = document.createElement('div');
  card.className = 'card';
  const username = document.createElement('h3');
  const foodType = document.createElement('h5');
  const location = document.createElement('p');
  const description = document.createElement('p');
  const foodImage = document.createElement('img');
  foodImage.src = kitchen.menu.foods[0].img_src;
  username.textContent = kitchen.username;
  foodType.textContent = kitchen.food_type;
  location.textContent = kitchen.location;
  description.textContent = kitchen.description;
  card.append(username,foodType,location,description,foodImage);
  document.body.append(card);
}