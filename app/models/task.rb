class Task < ApplicationRecord

    belongs_to :profile
    has_many :subtasks

    #belongs_to :group

    #has_one_attached :file

    validates :title, presence: true
    
end
