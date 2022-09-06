class GroupChatsController < ApplicationController
    before_action :set_group_chat, only: [:show, :update, :destroy]

    def index
        render json: GroupChat.all
    end

    def show 
        render json: @groupchat
    end
    
    def create
        render json: GroupChat.create!(group_chat_params), status: :created 
    end

    def update
        render json: @groupchat.update!(group_chat_params), status: :accepted
    end
    
    def destroy
        @groupchat.destroy 
        head :no_content
    end
    
    private

    def set_group_chat
        @groupchat = GroupChat.find(params[:id])
    end

    def group_chat_params
        params.permit(:group_id)
    end
end
