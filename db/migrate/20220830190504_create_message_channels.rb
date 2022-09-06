class CreateMessageChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :message_channels do |t|
      t.integer :friend_id
      t.integer :message_id

      t.timestamps
    end
  end
end
