class KitchenSerializer < ActiveModel::Serializer
  attributes :id, :username, :description, :location, :food_type
end
