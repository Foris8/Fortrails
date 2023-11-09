# Wrap the entire JSON structure in a block keyed by the trail's id
json.set! @trail.id do
  # Extract trail attributes
  json.extract! @trail, 
    :trail_name,
    :description, 
    :lat, 
    :lng,
    :difficulty,
    :average_rating,
    :total_num_rating,
    :start_lat,
    :start_lng,
    :end_lat,
    :end_lng,
    :park_name

  # Handle the picture
  if @trail.picture.attached?
    json.photo_url url_for(@trail.picture) 
  else
    json.photo_url "https://fortrails-seeds.s3.amazonaws.com/trail_14.jpg"
  end

  # Handle the owner
  if @trail.owner.present?
    json.owner do
      json.extract! @trail.owner, :id, :first_name, :last_name, :email
    end
  else
    json.owner({ id: nil, first_name: 'N/A', last_name: 'N/A', email: 'N/A' })
  end
end
