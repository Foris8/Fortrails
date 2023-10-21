class AddStartAndEndPointsToTrails < ActiveRecord::Migration[7.0]
  def change
    add_column :trails, :start_lat, :float, null: false
    add_column :trails, :start_lng, :float, null: false
    add_column :trails, :end_lat, :float, null: false
    add_column :trails, :end_lng, :float, null: false
  end
end
