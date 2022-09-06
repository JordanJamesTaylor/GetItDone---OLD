class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message_channel_id
end
