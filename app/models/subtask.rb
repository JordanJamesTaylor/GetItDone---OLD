class Subtask < ApplicationRecord

    belongs_to :task 

    validates :title, task_id, presence: true

end
