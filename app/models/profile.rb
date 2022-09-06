class Profile < ApplicationRecord

    has_many :tasks, dependent: :destroy
    has_many :subtasks, through: :tasks 

    has_many :friends, dependent: :destroy
    has_many :message_channels, through: :friends

    has_many :groups, dependent: :destroy
    has_many :group_chats, through: :groups

    has_secure_password
    
    has_one_attached :avatar

    validates :username, :email, :password, presence: true
    validates :email, :username, uniqueness: true
    validates :password, :username, length: { in: 6..20 }

    # CHECKS THAT PASSWORD CONTAINS A SPECIAL CHACATER, AT LEAST 6 CHARACTERS, AT LEAST ONE UPPER AND LOWER CASE LETTER, AND ONE NUMBER
    # TO BE TESTED 
    #validates :password, format: { with: /^(?=.{6,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/ }
    # OTHERWISE MAKE CUSTOM VALIDATION 

end 
