class AddTrailOwner < ActiveRecord::Migration[7.0]
  def change
    add_reference :trails, :user, null: true, foreign_key: true
  end
end
