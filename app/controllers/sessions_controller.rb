class SessionsController < ApplicationController

    skip_before_action :authorize, only: [:create, :show, :destroy]

    # Login
    def create
        profile = Profile.find_by(username: params[:username])
        byebug
        # Check user exsits & password is correct
        if profile&.authenticate(params[:password])
            # Store user ID in session cookie
            session[:profile_id] = profile.id
            render json: profile
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    # Logged in user
    def show 
        # Grab user class var from application_controller
        if current_user
            render json: current_user
        else
            render json: { message: "You must be logged in" }, status: :unauthorized
        end
    end

    # Logout
    def destroy
        session.delete :profile_id
        head :no_content
    end
        
end
