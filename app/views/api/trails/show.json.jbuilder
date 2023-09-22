json.trails do
    json.extract! @trails, :id,:trail_name, :description, :lat,:lng
end