class Group < ApplicationRecord

    belongs_to :profile
    has_many :tasks, dependent: :destroy
    # has_one :group_chat, dependent: :destroy
    has_many :messages, through: :group_chat

    validates :title, :profile_id, presence: true
    # Does this work? 
    validates :id, uniqueness: { scope: :profile_id }

end
