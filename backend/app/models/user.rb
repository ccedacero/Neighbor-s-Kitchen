class User < ApplicationRecord
    has_many :orders
    has_many :kitchens, through: :orders;
end
