class MessageChannelSerializer < ActiveModel::Serializer
  attributes :id, :friend_id, :message_id
end
