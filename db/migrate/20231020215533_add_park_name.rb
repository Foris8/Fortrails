class AddParkName < ActiveRecord::Migration[7.0]
  def change
    add_column :trails, :park_name, :string, null: false
  end
end
