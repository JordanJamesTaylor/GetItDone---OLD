class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :notes, :categories, :tags, :priority, :end_time, :profile_id, :group_id, :subtask_id

  # Allows user to NOT add a file to their task
  
  #def file_url
  #  if object.file.attached?
  #    Rails.application.routes.url_helpers.rails_blob_path(object.file, host: "storage")
  #  end
  #end

end
