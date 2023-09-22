@trails.each do |trail|
  json.set! trail.id do
    json.id trail.id
    json.trail_name trail.trail_name
    json.description trail.description
    json.lat trail.lat
    json.lng trail.lng
  end
end
