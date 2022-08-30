Rails.application.routes.draw do
  
  # Route to test app coniguration
  get '/hello', to: 'application#hello_world'
end
