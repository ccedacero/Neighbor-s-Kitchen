class UpdateUser < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :username, :name
    add_column :users, :email, :string 
    add_column :users, :phone, :string 
  end
end
