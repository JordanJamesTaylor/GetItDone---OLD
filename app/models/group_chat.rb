class GroupChat < ApplicationRecord

    belongs_to :group
    has_many :messages

    validates :group_id, presence: true
    # Does this work? 
    validates :profile_id, uniqueness: { scope: :group_id }
    
end
