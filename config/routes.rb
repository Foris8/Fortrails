Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
        resources :users, only: [:create]
        resources :parks, only: [:index, :show]
        resources :trails, only: [:index,:show,:create]
        resources :reviews, only: [:create, :destroy]
        resource :session, only: [:create, :show, :destroy]
    
    end

    get '*path', to: "static_pages#frontend_index"
    
end


