class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.string :profile_id
      t.boolean :is_friend

      t.timestamps
    end
  end
end
