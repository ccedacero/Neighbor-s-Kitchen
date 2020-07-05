class FoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :img_src, :availability
end
