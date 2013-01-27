class CreateTournaments < ActiveRecord::Migration
  def change
    create_table :tournaments do |t|
      t.string :nombre
      t.integer :cantparti
      t.references :local
      t.datetime :fechahora
      t.string :estado

      t.timestamps
    end
    add_index :tournaments, :local_id
  end
end
