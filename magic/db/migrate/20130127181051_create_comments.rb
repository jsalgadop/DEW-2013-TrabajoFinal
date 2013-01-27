class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :tournament
      t.references :user
      t.text :comentario
      t.integer :calificacion
      t.text :replica
      t.string :calificador
      t.text :duplica

      t.timestamps
    end
    add_index :comments, :tournament_id
    add_index :comments, :user_id
  end
end
