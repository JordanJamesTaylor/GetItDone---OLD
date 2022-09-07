class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :avatar_url, :bio

  has_many :tasks do
    object.tasks.order(:end_time)
  end
  
  has_many :groups

  def avatar_url
    if object.avatar.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.avatar, host: "storage")
    end
  end

end
