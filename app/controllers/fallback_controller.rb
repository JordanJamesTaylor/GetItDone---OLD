class FallbackController < ActionController::Base

  # Test action for app configuration
  def index
    render file: 'public/index.html'    
  end
    
  end