class OrderSerializer < ActiveModel::Serializer
  attributes :id, :date, :total_price, :foods
  has_one :user
  has_one :kitchen
  has_many :food_orders
  has_many :foods, through: :food_orders
end
