class FoodOrderSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :food
  belongs_to :order
end
