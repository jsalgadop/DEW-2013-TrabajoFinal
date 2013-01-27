class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :nombre
      t.string :paterno
      t.string :materno
      t.string :sexo
      t.string :tipodocumento
      t.string :numerodocumento
      t.string :direccion
      t.string :distrito
      t.string :email
      t.date :fechanacimiento
      t.string :celular
      t.string :nombreusuario
      t.string :claveusuario

      t.timestamps
    end
  end
end
