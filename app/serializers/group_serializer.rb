class GroupSerializer < ActiveModel::Serializer
  attributes :id, :title, :profile_id

  has_many :tasks do
    object.tasks.order(:end_time)
  end
  
end
