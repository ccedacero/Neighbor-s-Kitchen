Rails.application.routes.draw do
  resources :orders, only: [:show,:create, :update, :destroy]
  resources :kitchens, only: [:index]
  resources :users, only: [:create]    
  resources :food_orders, only: [:index, :show,:update, :destroy, :create]
 # resources :foods
  # resources :menus
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
