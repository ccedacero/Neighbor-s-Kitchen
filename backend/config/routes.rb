Rails.application.routes.draw do
  resources :foods
  resources :menus
  resources :orders
  resources :kitchens
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end