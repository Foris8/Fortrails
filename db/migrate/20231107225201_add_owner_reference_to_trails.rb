class AddOwnerReferenceToTrails < ActiveRecord::Migration[7.0]
  def change
    add_reference :trails, :owner, foreign_key: { to_table: :users }
  end
end
