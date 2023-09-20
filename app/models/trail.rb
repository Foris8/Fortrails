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
    validates :trail_name, :description, :lat, :lng, presence:true

    
end
