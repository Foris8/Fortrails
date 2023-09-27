json.extract! trail, 
  :id, 
  :trail_name,
  :description, 
  :lat, 
  :lng,
  :difficulty,
  :average_rating,
  :total_num_rating

  
if trail.picture.attached?
  json.photo_url url_for(trail.picture) 
else
  json.photo_url "/trail_placeholder.jpg"
end
