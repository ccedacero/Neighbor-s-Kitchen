class MenuSerializer < ActiveModel::Serializer
  attributes :id, :date
  has_one :kitchen
end
