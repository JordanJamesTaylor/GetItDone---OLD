class CreateSubtasks < ActiveRecord::Migration[7.0]
  def change
    create_table :subtasks do |t|
      t.string :title
      t.string :notes
      t.string :categories
      t.string :tags
      t.string :files
      t.integer :priority
      t.integer :end_time
      t.integer :task_id
      t.integer :delegate_id

      t.timestamps
    end
  end
end
