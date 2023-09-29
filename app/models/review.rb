class Review < ApplicationRecord
    validates :body, presence: true
    validates :rating, inclusion: { in: 1..5, message: "must be between 1 and 5" }
    validates :trail_id, uniqueness: { scope: :author_id, message: "already has a review from you" }
    validate :not_a_duplicate
    
    belongs_to :trail
    belongs_to :author, class_name: :User, inverse_of: :reviews

    private

    def not_a_duplicate
        if Review.exists?(author_id: author_id, trail_id: trail_id)
        errors.add(:base, message: "You have already left a review for this trail.")
        end
    end
end
