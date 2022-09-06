class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :email
      t.string :avatar
      t.string :bio
      t.integer :task_id
      t.integer :friend_id
      t.integer :group_id

      t.timestamps
    end
  end
end
