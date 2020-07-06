class Order < ApplicationRecord
  belongs_to :user
  belongs_to :kitchen
  has_many :food_orders
end
