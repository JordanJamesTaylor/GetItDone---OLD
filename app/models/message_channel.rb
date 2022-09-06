class MessageChannel < ApplicationRecord

    belongs_to :friend 
    has_many :messages, dependent: :destroy
    
end
