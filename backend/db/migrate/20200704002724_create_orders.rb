class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.datetime :date
      t.decimal :total_price
      t.references :user, null: false, foreign_key: true
      t.references :kitchen, null: false, foreign_key: true

      t.timestamps
    end
  end
end
