class KitchenSerializer < ActiveModel::Serializer
  attributes :id, :username, :description, :location, :food_type
  has_one :menu
  # def menu
  #   ActiveModel::SerializableResource.new(object.menu,  each_serializer: MenuSerializer)
  # end
end
