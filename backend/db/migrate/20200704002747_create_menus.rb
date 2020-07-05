class CreateMenus < ActiveRecord::Migration[6.0]
  def change
    create_table :menus do |t|
      t.date :date
      t.references :kitchen, null: false, foreign_key: true

      t.timestamps
    end
  end
end
