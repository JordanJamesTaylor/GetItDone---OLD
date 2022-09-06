class Message < ApplicationRecord

    belongs_to :message_channel

    validates :profile_id, presence: true
    
end
