class MessagesController < ApplicationController
    before_action :set_message, only: [:show, :update, :destroy]

    def index
        render json: Message.all
    end

    def show 
        render json: @message
    end
    
    def create
        render json: Message.create!(message_params), status: :created 
    end

    def update
        render json: @message.update!(message_params), status: :accepted
    end
    
    def destroy
        @message.destroy 
        head :no_content
    end
    
    private

    def set_message
        @message = Message.find(params[:id])
    end

    def message_params
        params.permit(:message_channel_id)
    end
end
