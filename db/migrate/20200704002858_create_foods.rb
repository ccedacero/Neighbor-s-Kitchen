class CreateFoods < ActiveRecord::Migration[6.0]
  def change
    create_table :foods do |t|
      t.string :name
      t.text :description
      t.decimal :price
      t.string :img_src
      t.boolean :availability
      t.references :menu, null: false, foreign_key: true

      t.timestamps
    end
  end
end
