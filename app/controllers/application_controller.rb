class ApplicationController < ActionController::API
    # Gives all controllers access to the cookies hash
    include ActionController::Cookies

    def hello_world
        session[:count] = (session[:count] || 0) + 1
        render json: { count: session[:count] }
    end
end
