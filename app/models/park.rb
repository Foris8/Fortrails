class Park < ApplicationRecord
    validates :park_name, :lat, :lng, presence: true
end
