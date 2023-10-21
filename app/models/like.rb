class Like < ApplicationRecord
  belongs_to :user
  belongs_to :trail

  # Validate that a user can't like the same trail more than once
  validates :user_id, uniqueness: { scope: :trail_id }
end