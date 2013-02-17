class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :ganador
      t.references :tournament
      t.references :user

      t.timestamps
    end
    add_index :members, :tournament_id
    add_index :members, :user_id
  end
end
