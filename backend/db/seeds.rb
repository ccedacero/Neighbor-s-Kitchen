# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
require 'faker'

FoodOrder.destroy_all
Order.destroy_all
User.destroy_all
Food.destroy_all
Menu.destroy_all
Kitchen.destroy_all


NY_ADDRESS = [
  "7909 Princess St.\nBrooklyn, NY 11203",
  "41 Argyle St.\nBrooklyn, NY 11213",
  "459 Lafayette St.\nBrooklyn, NY 11230",
  "61 E. Canterbury St.\nBronx, NY 10453",
  "7619 Somerset Street\nBrooklyn, NY 11215",
  "2 Armstrong St.\nNew York, NY 10028",
  "8586 Arcadia St.\nStaten Island, NY 10314",
  "24 Academy Ave.\nBrooklyn, NY 11201",
  "25 S. Railroad Avenue\nNew York, NY 10027",
  "87 E. Galvin St.\nWoodside, NY 11377",
  "842 Sheffield Drive\nForest Hills, NY 11375",
  "8942 Vale Dr.\nRidgewood, NY 11385",
  "8238 River St.\nBrooklyn, NY 11214",
  "7562 East Cambridge Ave.\nBrooklyn, NY 11228",
  "9641 Arcadia Court\nBronx, NY 10458",
  "287 West Pacific Street\nBronx, NY 10451",
  "941 Tanglewood Ave.\nBrooklyn, NY 11234",
  "193 Stillwater Lane\nBronx, NY 10467",
  "291 Andover Drive\nBrooklyn, NY 11237",
  "488 Pilgrim St.\nCorona, NY 11368",
  "140 Cedarwood Street\nNew York, NY 10128",
  "9099 Baker St.\nBrooklyn, NY 11208",
  "63 South Wrangler Lane\nBronx, NY 10466",
  "55 N. Wintergreen Court\nNew York, NY 10024",
  "168 Princess Avenue\nJackson Heights, NY 11372",
  "8731 S. Clay St.\nBrooklyn, NY 11209",
  "7 Bradford Drive\nBrooklyn, NY 11204",
  "8640 Oakland Dr.\nNew York, NY 10003",
  "577 W. Hillcrest St.\nNew York, NY 10029",
  "99 Briarwood Street\nFlushing, NY 11355",
  "323 Bradford St.\nBrooklyn, NY 11206",
  "8245 Tower Ave.\nSuite 516\nBronx, NY 10468",
  "77 Anderson Lane\nAstoria, NY 11103",
  "712 Mountainview Ave.\nBrooklyn, NY 11218",
  "540 Evergreen St.\nBrooklyn, NY 11216",
  "3 W. Sherman Lane\nNew York, NY 10009",
  "9650 Rockland St.\nBrooklyn, NY 11225",
  "7752 Arlington Ave.\nBrooklyn, NY 11221",
  "897 Livingston St.\nBrooklyn, NY 11211",
  "828 Homestead Street\nNew York, NY 10032",
  "492 New Saddle Lane\nBrooklyn, NY 11229",
  "46 Spring St.\nNew York, NY 10023",
  "22 Glendale Street\nBrooklyn, NY 11220",
  "6 Rocky River Dr.\nBrooklyn, NY 11212",
  "443 College Lane\nBrooklyn, NY 11207",
  "747 Holly Road\nNew York, NY 10025",
  "9674 State Street\nJamaica, NY 11434",
  "87 N. Academy St.\nBrooklyn, NY 11210",
  "121 Park Rd.\nBrooklyn, NY 11238",
  "9639 Parker Street\nAstoria, NY 11106",
  "606 Devon Dr.\nBrooklyn, NY 11219",
  "1 Grove Drive\nBronx, NY 10463",
  "7 Adams St.\nSouth Ozone Park, NY 11420",
  "7317 Young Street\nSuite 7\nAstoria, NY 11105",
  "78 Foxrun Dr.\nBronx, NY 10473",
  "601 Andover Court\nJamaica, NY 11435",
  "7380 Tarkiln Hill Ave.\nFar Rockaway, NY 11691",
  "9362 Elizabeth Ave.\nStaten Island, NY 10306",
  "54 Longfellow Rd.\nBrooklyn, NY 11236",
  "677 Bayberry Lane\nNew York, NY 10033",
  "9141 N. Bank St.\nBronx, NY 10460",
  "9283 Bald Hill Drive\nNew York, NY 10031",
  "9733 Academy St.\nBronx, NY 10452",
];

kitchen_addr = [
  "64 West Kirkland Ave.\nNew York, NY 10016",
  "641 Adams Road\nBrooklyn, NY 11233",
  "7400 Rockaway Ave.\nBronx, NY 10456",
  "259 Chestnut Street\nBronx, NY 10465",
  "653 Market St.\nNew York, NY 10002",
  "128 El Dorado Road\nBrooklyn, NY 11223",
  "27 Old York St.\nBronx, NY 10462",
  "9202 Fordham Street\nBrooklyn, NY 11235",
  "93 State Drive\nBronx, NY 10472",
  "8444 Park Rd.\nNew York, NY 10040",
  "60 Glenlake Dr.\nBronx, NY 10469",
  "651 Garfield Street\nFlushing, NY 11354",
  "136 Lancaster Rd.\nBronx, NY 10457",
  "97 Wayne Avenue\nPatchogue, NY 11772",
  "533 East Academy Lane\nStaten Island, NY 10312",
  "715 Lake Drive\nEast Elmhurst, NY 11370",
  "71 Jones Rd.\nBronx, NY 10461",
  "622 Marshall Drive\nJamaica, NY 11432",
  "7374 North Elmwood St.\nBrooklyn, NY 11224",
  "56 Pilgrim Drive\nNew York, NY 10034",
]




def seed_users 
  addressList = NY_ADDRESS.shuffle
    10.times do |i| 
      name = Faker::Name.unique.first_name
      last = Faker::Name.unique.last_name
      email = Faker::Internet.email 
      phone = Faker::PhoneNumber.cell_phone

      full_name = name + " " + last
      username = name[0] + last
      username.downcase!
      location = addressList[i]
      User.create(
        name: username, 
        location: location,
        email: email,
        phone: phone
      )
    end
end
seed_users()

# food_types = ['Indonesian','Turkish','Thai','Spanish','Moroccan','Japanese','Indian','Italian','French','Chinese','Korean','Peruvian','Ecuadorian','Guatemalan'];
def seed_kitchens(kitchen_addr)
    addressList = kitchen_addr.shuffle
    food_types = ['Asian','Middle Eastern','Indian','Italian','Amerian', 'Caribbean'];
    10.times do |i|
      username = Faker::Restaurant.name;
      description = Faker::Restaurant.description;
      phone = Faker::PhoneNumber.cell_phone
      img_src = "http://lorempixel.com/640/480/food";
      location = addressList[i]
      food_type = food_types[rand(0..food_types.length)];
      
      Kitchen.create(
        username: username, 
        description: description, 
        location: location,
        food_type: food_type,
        phone: phone,
        img_src: img_src
      )
  end
end
seed_kitchens(kitchen_addr)


def seed_menus 
  kitchen_ids = Kitchen.all.ids.shuffle
  10.times do |i|
      date = Faker::Date.forward(days: 23);
      Menu.create(
        date: date,
        kitchen_id: kitchen_ids[i]
      )
  end
end
seed_menus() 

def seed_foods 
  menu_ids = Menu.all.ids.shuffle
  10.times do |i|
    5.times do |j|
      name = Faker::Food.dish;
      description = Faker::Food.description;
      price = Random.rand(2..20);
      img_src = "http://lorempixel.com/640/480/food";
      availability = [true, false].sample;
      Food.create(
        name: name, 
        description: description, 
        price: price, 
        img_src: img_src, 
        availability: availability,
        menu_id: menu_ids[i]
      )
    end
  end
end
seed_foods()


def seed_orders
  kitchen_ids = Kitchen.all.ids.shuffle
  user_ids = User.all.ids.shuffle
  10.times do |i|
    total_price = Random.rand(6..35)
    date = DateTime.now
    Order.create(
      date: date,
      total_price: total_price,
      user_id: user_ids[i],
      kitchen_id: kitchen_ids[i]
      )
  end
end
seed_orders()

def seed_food_orders
  food_ids = Food.all.ids.shuffle
  order_ids = Order.all.ids.shuffle
  10.times do |i|
    FoodOrder.create(
      food_id: food_ids[i],
      order_id: order_ids[i]
    )
  end
end
seed_food_orders()