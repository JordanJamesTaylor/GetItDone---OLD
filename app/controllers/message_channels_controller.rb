class MessageChannelsController < ApplicationController
    before_action :message_channel_params, only: [:show, :update, :destroy]

    def index
        render json: MessageChannel.all
    end

    def show 
        render json: @message_channel
    end
    
    def create
        render json: MessageChannel.create!(message_channel_params), status: :created 
    end

    def update
        render json: @message_channel.update!(message_channel_params), status: :accepted
    end
    
    def destroy
        @message_channel.destroy 
        head :no_content
    end
    
    private

    def set_messageChannel
        @message_channel = MessageChannel.find(params[:id])
    end

    def message_channel_params
        params.permit(:messageChannel_channel_id)
    end
end
