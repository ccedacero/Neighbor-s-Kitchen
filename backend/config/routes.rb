Rails.application.routes.draw do
  # resources :foods
  # resources :menus
  resources :orders, only: [:show,:create, :update, :destroy]
  resources :kitchens, only: [:index]
  resources :users, only: [:create]    
  resources :food_orders, only: [:index, :show,:update, :delete, :create]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
