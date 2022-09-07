Rails.application.routes.draw do
  resources :tasks
  resources :messages
  resources :message_channels
  resources :group_chats
  resources :groups
  resources :friends
  resources :subtasks
  resources :profiles

  resources :groups, only: [:index] do
    resources :tasks, only: [:index, :create]
  end
  
  # Test app coniguration
  get '/hello', to: 'application#hello_world'

  # Login
  post "/login", to: "sessions#create"
  
  # Kepp user logged in 
  get "/me", to: "sessions#show"

  # Logout
  delete "/logout", to: "sessions#destroy"

  # Check user permissions
  get "/auth", to: "profiles#show"

  # Add/change user profile information
  patch "/profiles/info/:id", to: "profiles#updateInfo"

  # Handles any requests that come through that aren't requests for our API routes by returning the public/index.html file instead
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
