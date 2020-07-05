class CreateKitchens < ActiveRecord::Migration[6.0]
  def change
    create_table :kitchens do |t|
      t.string :username
      t.text :description
      t.string :location
      t.string :food_type

      t.timestamps
    end
  end
end
