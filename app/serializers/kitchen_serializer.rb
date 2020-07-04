class KitchenSerializer < ActiveModel::Serializer
  attributes :id, :username, :description, :location, :food_type
  
  def menu
    ActiveModel::SerializableResource.new(object.menu,  each_serializer: MenuSerializer)
  end
end
