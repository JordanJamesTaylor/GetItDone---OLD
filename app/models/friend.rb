class Friend < ApplicationRecord

    belongs_to :profile
    has_one :message_channel
    has_many :messages, through: :message_channel

    validates :profil_id, presence: true

end
