class CreateFilters < ActiveRecord::Migration
  def change
    create_table :filters do |t|
      t.integer :opcion
      t.references :local
      t.string :estado

      t.timestamps
    end
    add_index :filters, :local_id
  end
end
