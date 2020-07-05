class Menu < ApplicationRecord
  belongs_to :kitchen
  has_many :foods

  accepts_nested_attributes_for :foods
end
