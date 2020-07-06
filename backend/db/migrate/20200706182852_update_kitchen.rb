class UpdateKitchen < ActiveRecord::Migration[6.0]
  def change
    add_column :kitchens, :img_src, :string
    add_column :kitchens, :phone, :string
  end
end
