class MenuSerializer < ActiveModel::Serializer
  attributes :id, :date
  has_many :foods


  def foods
    ActiveModel::SerializableResource.new(object.foods,  each_serializer: FoodSerializer)
  end
end
