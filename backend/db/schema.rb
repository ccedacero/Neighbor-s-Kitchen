# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_06_182852) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "food_orders", force: :cascade do |t|
    t.bigint "food_id", null: false
    t.bigint "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["food_id"], name: "index_food_orders_on_food_id"
    t.index ["order_id"], name: "index_food_orders_on_order_id"
  end

  create_table "foods", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.decimal "price"
    t.string "img_src"
    t.boolean "availability"
    t.bigint "menu_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["menu_id"], name: "index_foods_on_menu_id"
  end

  create_table "kitchens", force: :cascade do |t|
    t.string "username"
    t.text "description"
    t.string "location"
    t.string "food_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "img_src"
    t.string "phone"
  end

  create_table "menus", force: :cascade do |t|
    t.date "date"
    t.bigint "kitchen_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["kitchen_id"], name: "index_menus_on_kitchen_id"
  end

  create_table "orders", force: :cascade do |t|
    t.datetime "date"
    t.decimal "total_price"
    t.bigint "user_id", null: false
    t.bigint "kitchen_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["kitchen_id"], name: "index_orders_on_kitchen_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email"
    t.string "phone"
  end

  add_foreign_key "food_orders", "foods"
  add_foreign_key "food_orders", "orders"
  add_foreign_key "foods", "menus"
  add_foreign_key "menus", "kitchens"
  add_foreign_key "orders", "kitchens"
  add_foreign_key "orders", "users"
end
