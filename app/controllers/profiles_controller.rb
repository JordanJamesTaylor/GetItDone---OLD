class ProfilesController < ApplicationController

    skip_before_action :authorize, only: [:create]

    def index
        render json: Profile.all
    end

    def show 
        render json: @current_user
    end
    
    def create
        profile = Profile.create!(profile_params)
        session[:profile_id] = profile.id
        render json: profile, status: :created
    end

    def update
        render json: @current_user.update!(profile_params), status: :accepted
    end
    
    def destroy
        @current_user.destroy 
        head :no_content
    end

    def updateInfo
        if params.has_key?(:avatar) 
            @current_user.update_attribute(:avatar, params[:avatar])
        end
        if params.has_key?(:username) 
            @current_user.update_attribute(:username, params[:username])
        end
        if params.has_key?(:password) 
            @current_user.update_attribute(:password, params[:password])
        end
        if params.has_key?(:bio) 
            @current_user.update_attribute(:bio, params[:bio])
        end
        render json: @current_user, status: :accepted
    end
    
    private

    def profile_params
        params.permit(:username, :first_name, :last_name, :password, :email, :avatar, :bio, :task_id)
    end

end
