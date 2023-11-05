# == Schema Information
#
# Table name: trails
#
#  id          :bigint           not null, primary key
#  trail_name  :string           not null
#  description :string           not null
#  lat         :float            not null
#  lng         :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Trail < ApplicationRecord
    validates :trail_name, :description, :lat, :lng, :start_lat, :start_lng, :end_lat, :end_lng, presence:true

    has_many :reviews, dependent: :destroy
    has_one_attached :picture
    has_many :likes, dependent: :destroy
    has_many :likers, through: :likes, source: :user
    belongs_to :user



    def average_rating
        average = reviews.average(:rating)
        average && average.round(1)
    end

    def total_num_rating
        number_of_ratings = reviews.count(:rating)
    end

end
