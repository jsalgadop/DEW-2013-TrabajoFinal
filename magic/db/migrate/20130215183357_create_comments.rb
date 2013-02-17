class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :comentario
      t.integer :calificacion
      t.references :tournament
      t.references :user

      t.timestamps
    end
    add_index :comments, :tournament_id
    add_index :comments, :user_id
  end
end
