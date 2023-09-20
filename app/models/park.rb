# == Schema Information
#
# Table name: parks
#
#  id         :bigint           not null, primary key
#  park_name  :string           not null
#  lat        :float            not null
#  lng        :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Park < ApplicationRecord
    validates :park_name, :lat, :lng, presence: true
end
