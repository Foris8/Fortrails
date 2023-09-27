class ChangeTrailsTable < ActiveRecord::Migration[7.0]
  def change
    add_column :trails, :difficulty, :string, null: false
  end
end
