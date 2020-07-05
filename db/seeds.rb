# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
require 'faker'


User.destroy_all
Food.destroy_all
Menu.destroy_all
Kitchen.destroy_all
Order.destroy_all

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

# def filter_nyc_addresses(arr) 
#    arr = arr.map do |addr|  
#   addr.slice(-10)
#   # byebug
#   end
# end 

# filter_nyc_addresses(ny_address)



def seed_users 
  addressList = NY_ADDRESS.shuffle
    10.times do |i| 
      name = Faker::Name.unique.first_name
      last = Faker::Name.unique.last_name
      full_name = name + " " + last
      username = name[0] + last
      username.downcase!
      location = addressList[i]
      User.create(
        username: username, 
        location: location
      )
    #   address = Faker::Address.city
    end
end

seed_users()

def seed_kitchens
    addressList = NY_ADDRESS.shuffle
    food_types = ['Indonesian','Turkish','Thai','Spanish','Moroccan','Japanese','Indian','Italian','French','Chinese','Korean','Peruvian','Ecuadorian','Guatemalan'];
    10.times do |i|
    username = Faker::Restaurant.name;
    description = Faker::Restaurant.description;
    location = addressList[i]
    food_type = food_types[rand(0..food_types.length)];
    
    Kitchen.create(
      username: username, 
      description: description, 
      location: location,
      food_type: food_type
    )
  end
end
seed_kitchens()

def seed_orders 
    10.times do 
      total_price = Random.rand(6..35)
      date = DateTime.now
    end
end
seed_orders()

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
    name = Faker::Food.dish;
    description = Faker::Food.description;
    price = Random.rand(2..20);
    img_src = "http://lorempixel.com/640/480/food";
    availability = false;
    
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
seed_foods()
   # seed_users(ny_address)

def seed_kitchens(kitchen_addr)
    food_types = ['Indonesian','Turkish','Thai','Spanish','Moroccan','Japanese','Indian','Italian','French','Chinese','Korean','Peruvian','Ecuadorian','Guatemalan','Fusion'];
    10.times do 
    username = Faker::Restaurant.name;
    description = Faker::Restaurant.description;
    location = kitchen_addr[rand(0..kitchen_addr.length)];
    food_type = food_types[rand(0..food_types.length)];
    Kitchen.create(username: username, description: description, location:location, food_type:food_type)
  end
end
# seed_kitchens(kitchen_addr)
# 
# seed_orders()


# def seed_foods 
#     10.times do 
# name = Faker::Food.dish;
# description = Faker::Food.description;
# price = Random.rand(2..20);
# img_src = "";
# availability = false;
#   end
# end
# seed_foods()


# # will use for generating random user order combinations later

def seed_orders

def gen_10_nums
    arr = []
    while arr.size < 10
      arr << rand(0..9)
      arr.uniq!
    end
    arr
  end

  i = 0
  10.times do
    arr = gen_10_nums
    byebug
    kitchen = Kitchen.all.map(&:id)
    users = User.all.map(&:id)
    total_price = Random.rand(6..35)
    date = DateTime.now
    Order.create(date: date, total_price: total_price, user_id: users[arr[i]], kitchen_id: kitchen[arr[i]])
    i += 1
  end
end
seed_orders()

# # ny_address = 
# # [
# #   "7909 Princess St. <br>Brooklyn, NY 11203",
# #   "41 Argyle St. <br>Brooklyn, NY 11213",
# #   "54 Talbot Rd. <br>South Richmond Hill, NY 11419",
# #   "459 Lafayette St. <br>Brooklyn, NY 11230",
# #   "7710 Halifax Drive <br>Huntington Station, NY 11746",
# #   "61 E. Canterbury St. <br>Bronx, NY 10453",
# #   "7619 Somerset Street <br>Brooklyn, NY 11215",
# #   "2 Armstrong St. <br>New York, NY 10028",
# #   "66 North Hilltop Drive <br>Jamestown, NY 14701",
# #   "8586 Arcadia St. <br>Staten Island, NY 10314",
# #   "24 Academy Ave. <br>Brooklyn, NY 11201",
# #   "25 S. Railroad Avenue <br>New York, NY 10027",
# #   "87 E. Galvin St. <br>Woodside, NY 11377",
# #   "842 Sheffield Drive <br>Forest Hills, NY 11375",
# #   "8942 Vale Dr. <br>Ridgewood, NY 11385",
# #   "172 Somerset Lane <br>Fairport, NY 14450",
# #   "9019 Tunnel St. <br>Massapequa, NY 11758",
# #   "582 Amerige Drive <br>Brentwood, NY 11717",
# #   "8238 River St. <br>Brooklyn, NY 11214",
# #   "285 Augusta Lane <br>Rego Park, NY 11374",
# #   "25 Wayne Drive <br>Auburn, NY 13021",
# #   "26 Manor Ave. <br>Bay Shore, NY 11706",
# #   "7562 East Cambridge Ave. <br>Brooklyn, NY 11228",
# #   "9641 Arcadia Court <br>Bronx, NY 10458",
# #   "287 West Pacific Street <br>Bronx, NY 10451",
# #   "941 Tanglewood Ave. <br>Brooklyn, NY 11234",
# #   "193 Stillwater Lane <br>Bronx, NY 10467",
# #   "291 Andover Drive <br>Brooklyn, NY 11237",
# #   "488 Pilgrim St. <br>Corona, NY 11368",
# #   "140 Cedarwood Street <br>New York, NY 10128",
# #   "9099 Baker St. <br>Brooklyn, NY 11208",
# #   "7623 Glenridge St. <br>Spring Valley, NY 10977",
# #   "63 South Wrangler Lane <br>Bronx, NY 10466",
# #   "55 N. Wintergreen Court <br>New York, NY 10024",
# #   "386 Bank St. <br>Rome, NY 13440",
# #   "168 Princess Avenue <br>Jackson Heights, NY 11372",
# #   "2 NW. Creek Drive <br>Lockport, NY 14094",
# #   "8731 S. Clay St. <br>Brooklyn, NY 11209",
# #   "7 Bradford Drive <br>Brooklyn, NY 11204",
# #   "8640 Oakland Dr. <br>New York, NY 10003",
# #   "577 W. Hillcrest St. <br>New York, NY 10029",
# #   "737 Deerfield Street <br>Ithaca, NY 14850",
# #   "99 Briarwood Street <br>Flushing, NY 11355",
# #   "323 Bradford St. <br>Brooklyn, NY 11206",
# #   "917 East Halifax Street <br>Poughkeepsie, NY 12603",
# #   "9704 North Smoky Hollow Road <br>Lindenhurst, NY 11757",
# #   "8245 Tower Ave. <br>Suite 516 <br>Bronx, NY 10468",
# #   "77 Anderson Lane <br>Astoria, NY 11103",
# #   "712 Mountainview Ave. <br>Brooklyn, NY 11218",
# #   "48 South Division Drive <br>North Tonawanda, NY 14120",
# #   "540 Evergreen St. <br>Brooklyn, NY 11216",
# #   "3 W. Sherman Lane <br>New York, NY 10009",
# #   "8677 Berkshire Road <br>Huntington, NY 11743",
# #   "9650 Rockland St. <br>Brooklyn, NY 11225",
# #   "7752 Arlington Ave. <br>Brooklyn, NY 11221",
# #   "897 Livingston St. <br>Brooklyn, NY 11211",
# #   "828 Homestead Street <br>New York, NY 10032",
# #   "492 New Saddle Lane <br>Brooklyn, NY 11229",
# #   "46 Spring St. <br>New York, NY 10023",
# #   "22 Glendale Street <br>Brooklyn, NY 11220",
# #   "6 Rocky River Dr. <br>Brooklyn, NY 11212",
# #   "443 College Lane <br>Brooklyn, NY 11207",
# #   "22 North Brickell Drive <br>Fresh Meadows, NY 11365",
# #   "83 Pierce Dr. <br>Newburgh, NY 12550",
# #   "62 4th St. <br>Tonawanda, NY 14150",
# #   "747 Holly Road <br>New York, NY 10025",
# #   "9674 State Street <br>Jamaica, NY 11434",
# #   "87 N. Academy St. <br>Brooklyn, NY 11210",
# #   "121 Park Rd. <br>Brooklyn, NY 11238",
# #   "8846 Glenholme Court <br>Levittown, NY 11756",
# #   "9335 Race Ave. <br>Endicott, NY 13760",
# #   "9933 Armstrong Ave. <br>Elmont, NY 11003",
# #   "9639 Parker Street <br>Astoria, NY 11106",
# #   "606 Devon Dr. <br>Brooklyn, NY 11219",
# #   "1 Grove Drive <br>Bronx, NY 10463",
# #   "8869 North Wentworth St. <br>New York, NY 10011",
# #   "7 Adams St. <br>South Ozone Park, NY 11420",
# #   "7317 Young Street <br>Suite 7 <br>Astoria, NY 11105",
# #   "78 Foxrun Dr. <br>Bronx, NY 10473",
# #   "601 Andover Court <br>Jamaica, NY 11435",
# #   "228 West El Dorado St. <br>Poughkeepsie, NY 12601",
# #   "7380 Tarkiln Hill Ave. <br>Far Rockaway, NY 11691",
# #   "9362 Elizabeth Ave. <br>Staten Island, NY 10306",
# #   "54 Longfellow Rd. <br>Brooklyn, NY 11236",
# #   "677 Bayberry Lane <br>New York, NY 10033",
# #   "9141 N. Bank St. <br>Bronx, NY 10460",
# #   "9283 Bald Hill Drive <br>New York, NY 10031",
# #   "9733 Academy St. <br>Bronx, NY 10452",
# #   "9696 North William Lane <br>Middletown, NY 10940",
# #   "64 West Kirkland Ave. <br>New York, NY 10016",
# #   "641 Adams Road <br>Brooklyn, NY 11233",
# #   "7400 Rockaway Ave. <br>Bronx, NY 10456",
# #   "59 Hill Lane <br>Rochester, NY 14609",
# #   "259 Chestnut Street <br>Bronx, NY 10465",
# #   "653 Market St. <br>New York, NY 10002",
# #   "48 High Point Lane <br>Troy, NY 12180",
# #   "60 South Overlook Street <br>Hamburg, NY 14075",
# #   "69 Talbot Court <br>Westbury, NY 11590",
# #   "128 El Dorado Road <br>Brooklyn, NY 11223",
# #   "742 Old Cedarwood Rd. <br>Yonkers, NY 10701",
# #   "27 Old York St. <br>Bronx, NY 10462",
# #   "826 Anderson St. <br>Freeport, NY 11520",
# #   "9202 Fordham Street <br>Brooklyn, NY 11235",
# #   "93 State Drive <br>Bronx, NY 10472",
# #   "8444 Park Rd. <br>New York, NY 10040",
# #   "7783 Sherwood Dr. <br>Hempstead, NY 11550",
# #   "910 E. White Dr. <br>Buffalo, NY 14221",
# #   "60 Glenlake Dr. <br>Bronx, NY 10469",
# #   "651 Garfield Street <br>Flushing, NY 11354",
# #   "136 Lancaster Rd. <br>Bronx, NY 10457",
# #   "718 Griffin Street <br>Buffalo, NY 14224",
# #   "10 Lakeview St. <br>Webster, NY 14580",
# #   "97 Wayne Avenue <br>Patchogue, NY 11772",
# #   "533 East Academy Lane <br>Staten Island, NY 10312",
# #   "715 Lake Drive <br>East Elmhurst, NY 11370",
# #   "71 Jones Rd. <br>Bronx, NY 10461",
# #   "643 Arcadia Rd. <br>West Babylon, NY 11704",
# #   "622 Marshall Drive <br>Jamaica, NY 11432",
# #   "7374 North Elmwood St. <br>Brooklyn, NY 11224",
# #   "56 Pilgrim Drive <br>New York, NY 10034",
# #   "3 8th Ave. <br>Buffalo, NY 14215"
# # ]