class Food < ApplicationRecord
  belongs_to :menu
  has_many :food_orders
  has_many :orders, through: :food_orders
end
