class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :paterno
      t.string :materno
      t.string :sexo
      t.string :tipodocumento
      t.string :numerodocumento
      t.string :direccion
      t.string :email
      t.date :fechanacimiento
      t.string :celular
      t.string :nombreusuario
      t.string :claveusuario
      t.references :district

      t.timestamps
    end
    add_index :users, :district_id
  end
end
