class CreateOptions < ActiveRecord::Migration
  def change
    create_table :options do |t|
      t.string :opcion
      t.references :local
      t.string :estado

      t.timestamps
    end
    add_index :options, :local_id
  end
end
