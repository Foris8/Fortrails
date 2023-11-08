class ChangeUserIdToBeOptionalInTrails < ActiveRecord::Migration[7.0]
  def change
    change_column_null :trails, :user_id, true
  end
end
