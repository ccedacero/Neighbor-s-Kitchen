class FoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :img_src, :availability
  has_many :food_orders
  has_many :orders, through: :food_orders
end
