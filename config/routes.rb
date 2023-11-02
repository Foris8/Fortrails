Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
        get "trails/search", to: "trails#search"
        resources :users, only: [:create] do
          member do
            get 'liked_trails', to: 'users#liked_trails'
          end
        end
        resources :parks, only: [:index, :show]
        resources :trails
        resources :reviews, only: [:create, :destroy, :update]
        resources :likes, only: [:create, :destroy]
        delete 'likes', to: 'likes#destroy'
        resource :session, only: [:create, :show, :destroy]
    end

    get '*path', to: "static_pages#frontend_index"
  
  if Rails.env.development? || Rails.env.test?
    # Allow access to Active Storage in development and test environments
    # This is usually already present in Rails 6+
    mount ActiveStorage::Engine => '/rails/active_storage'
  end
  
end


