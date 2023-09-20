class CreateParks < ActiveRecord::Migration[7.0]
  def change
    create_table :parks do |t|
      t.string :park_name, null:false
      t.float :lat, null:false
      t.float :lng, null:false
      t.timestamps
    end
  end
end
