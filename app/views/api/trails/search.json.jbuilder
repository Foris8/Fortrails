json.trails({})

json.trails do
    @trails.each do |trail|
        json.set! trail.id do
            json.extract! trail, :id, :trail_name, :description, :lat, :lng, :difficulty, :average_rating, :total_num_rating
        end
    end
end