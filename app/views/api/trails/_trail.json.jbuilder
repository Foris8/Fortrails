json.extract! trail, 
  :id, 
  :trail_name,
  :description, 
  :lat, 
  :lng

  
# if trail.photo.attached?
#   json.photo_url url_for(trail.photo) 
# else
#   json.photo_url "/trail_placeholder.png"
# end
