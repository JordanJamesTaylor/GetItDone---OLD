class ApplicationController < ActionController::API
    # Gives all controllers access to the cookies hash
    include ActionController::Cookies

    # Handle these errors across all controllers with noted methods
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    
    # Set currently logged in user and authorize them before performing any actions in any controller
    before_action :current_user
    before_action :authorize

    # Test action to ensure app is configured correctly
    def hello_world
        session[:count] = (session[:count] || 0) + 1
        render json: { count: session[:count] }
    end

    # Hide from public access
    private

    # Store currently logged in user across backend
    def current_user
        @current_user ||= Profile.find_by(id: session[:profile_id])
    end

    # Authorize currently logged in user across backend
    def authorize
        unless @current_user
            render json: { error: "YOU'RE HITTING AUTHORIZE" }, status: :unauthorized
        end
    end

    # Error handling method for rescue_from RecordNotFound
    def render_record_not_found error
        render json: { error: error.message }, status: :not_found 
    end

    # Error handling method for rescue_from RecordInvalid
    def render_unprocessable_entity invalid
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
