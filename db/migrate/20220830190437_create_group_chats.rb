class CreateGroupChats < ActiveRecord::Migration[7.0]
  def change
    create_table :group_chats do |t|
      t.integer :group_id

      t.timestamps
    end
  end
end
