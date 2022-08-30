Rails.application.routes.draw do
  
  # Route to test app coniguration
  get '/hello', to: 'application#hello_world'

  # Handles any requests that come through that aren't requests for our API routes by returning the public/index.html file instead
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
