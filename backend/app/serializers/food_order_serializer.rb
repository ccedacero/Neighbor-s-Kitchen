class FoodOrderSerializer < ActiveModel::Serializer
  attributes :id
  has_one :food
  has_one :order
end
