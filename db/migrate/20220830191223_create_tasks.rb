class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :notes
      t.string :categories
      t.string :tags
      t.integer :priority
      t.datetime :end_time
      t.string :file
      t.integer :profile_id
      t.integer :group_id
      t.integer :subtask_id

      t.timestamps
    end
  end
end
