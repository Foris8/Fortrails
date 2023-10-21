json.trails({})

json.trails do
    @trails.each do |trail|
        json.set! trail.id do
            json.extract! trail, :id, :trail_name, :description, :lat, :lng, :start_lat, :start_lng, :end_lat, :end_lng, :difficulty, :average_rating, :total_num_rating,:park_name
        end
    end
end