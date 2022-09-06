class SubtaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :notes, :categories, :tags, :priority, :end_time, :task_id, :delegate_id
end
