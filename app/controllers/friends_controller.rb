class FriendsController < ApplicationController

    before_action :set_friend, only: [:show, :update, :destroy]

    def index
        render json: Friend.all
    end

    def show 
        render json: @friend
    end
    
    def create
        render json: Friend.create!(friend_params), status: :created 
    end

    def update
        render json: @friend.update!(friend_params), status: :accepted
    end
    
    def destroy
        @friend.destroy 
        head :no_content
    end
    
    private

    def set_friend
        @friend = Friend.find(params[:id])
    end

    def friend_params
        params.permit(:username, :first_name, :last_name, :password, :email, :avatar, :bio)
    end

end
