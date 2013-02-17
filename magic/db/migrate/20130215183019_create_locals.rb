class CreateLocals < ActiveRecord::Migration
  def change
    create_table :locals do |t|
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.string :telefono
      t.references :district

      t.timestamps
    end
    add_index :locals, :district_id
  end
end
