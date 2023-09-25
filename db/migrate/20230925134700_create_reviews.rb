class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.text :body, null: false
      t.integer :rating, null: false
      t.references :trail, null: false, foreign_key: true, index: false
      t.references :author, null: false, foreign_key: { to_table: :users}
      t.timestamps
    end
  end
end
