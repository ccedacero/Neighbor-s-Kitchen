class Kitchen < ApplicationRecord
    has_many :orders
    has_many :users, through: :orders
    has_one :menu
    has_many :foods, through: :menu

    accepts_nested_attributes_for :menu
    
end
