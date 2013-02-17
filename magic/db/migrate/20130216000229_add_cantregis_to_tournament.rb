class AddCantregisToTournament < ActiveRecord::Migration
  def change
    add_column :tournaments, :cantregis, :integer

  end
end
