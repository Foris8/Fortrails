class RemoveUserReferenceFromTrails < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :trails, :users
    remove_column :trails, :user_id
  end
end
