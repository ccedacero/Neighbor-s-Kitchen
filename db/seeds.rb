# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
require 'faker'
# User.destroy_all
# Kitchen.destroy_all
# Menu.destroy_all
# Order.destroy_all
# User.destroy_all
# Food.destroy_all

def seed_users
    10.times do
      name = Faker::Name.unique.first_name
      last = Faker::Name.unique.last_name
      full_name = name + " " + last
      username = name[0] + last
      username.downcase!
    #   address = Faker::Address.city
    end
  end
#   seed_users

def seed_kitchens
    food_types = ['Indonesian','Turkish','Thai','Spanish','Moroccan','Japanese','Indian','Italian','French','Chinese','Korean','Peruvian','Ecuadorian','Guatemalan'];
    10.times do 
    username = Faker::Restaurant.name;
    description = Faker::Restaurant.description;
    location = 'TBD';
    food_type = food_types[rand(0..food_types.length)];
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


def seed_foods 
    10.times do 
name = Faker::Food.dish;
description = Faker::Food.description;
price = Random.rand(2..20);
img_src = "";
availability = false;
  end
end
seed_foods()

def seed_menus 
    10.times do 
        date = Faker::Date.forward(days: 23);
    end
end
seed_menus 
  
# will use for generating random user order combinations later
# def gen_10_nums
#     arr = []
#     while arr.size < 10
#       arr << rand(0..9)
#       arr.uniq!
#     end
#     arr
#   end
  
#   i = 0
#   10.times do
#     arr = gen_10_nums
#     recipe = Recipe.all.map(&:id)
#     users = User.all.map(&:id)
#     Favorite.create(user_id: users[arr[i]], recipe_id: recipe[arr[i]])
#     i += 1
#   end



