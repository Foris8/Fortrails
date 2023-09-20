class CreateTrails < ActiveRecord::Migration[7.0]
  def change
    create_table :trails do |t|
      t.string :trail_name, null:false
      t.string :description, null:false
      t.float :lat, null:false
      t.float :lng, null:false
      t.timestamps
    end
  end
end
