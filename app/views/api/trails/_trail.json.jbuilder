json.extract! trail, 
  :id, 
  :title,
  :description, 
  :lat, 
  :lng, 

  
if bench.photo.attached?
  json.photo_url url_for(bench.photo) 
else
  json.photo_url "/bench_placeholder.png"
end
