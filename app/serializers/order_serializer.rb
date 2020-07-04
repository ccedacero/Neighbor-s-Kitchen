class OrderSerializer < ActiveModel::Serializer
  attributes :id, :date, :total_price
  has_one :user
  has_one :kitchen
end
