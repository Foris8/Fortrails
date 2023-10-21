Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
        get "trails/search", to: "trails#search"
        resources :users, only: [:create]
        resources :parks, only: [:index, :show]
        resources :trails, only: [:index,:show,:create]
        resources :reviews, only: [:create, :destroy, :update]
        resource :session, only: [:create, :show, :destroy]
    end

    get '*path', to: "static_pages#frontend_index"
  
  if Rails.env.development? || Rails.env.test?
    # Allow access to Active Storage in development and test environments
    # This is usually already present in Rails 6+
    mount ActiveStorage::Engine => '/rails/active_storage'
  end
  
end


