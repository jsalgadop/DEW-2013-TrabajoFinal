class CreateLogins < ActiveRecord::Migration
  def change
    create_table :logins do |t|
      t.string :nombre
      t.string :clave

      t.timestamps
    end
  end
end
