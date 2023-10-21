# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Park.destroy_all
  Trail.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('parks')
  ApplicationRecord.connection.reset_pk_sequence!('trails')
end

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    first_name: "Fanyi",
    last_name: "Tang",
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  users = 30.times.map do 
    User.create!({
      first_name: Faker::Name.unique.first_name,
      last_name: Faker::Name.unique.last_name,
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end



  puts "Creating parks..."
  10.times do
    Park.create!(
      park_name: Faker::Address.unique.community, # Generates a fake community name
      lat: rand(-90.0..90.0),           # Generates a fake latitude
      lng: rand(-180.0..180.0)           # Generates a fake longitude
    )
  end


  puts "Creating trails..."

  # Define a proc to generate random descriptions
  def random_description
    descriptions = [
      'A beautiful trail through lush greenery with scenic views.',
      'Enjoy a peaceful walk along the riverbank with the city skyline in the backdrop.',
      'Explore this serene trail that winds through the heart of the city, perfect for relaxation.',
      'This trail offers a great opportunity for birdwatching and wildlife enthusiasts.',
      'A family-friendly trail with easy access and stunning natural surroundings.',
      'Hike through diverse landscapes, from wooded areas to open fields, on this moderate-level trail.',
      'A challenging trail with steep climbs and rewarding vistas of the surrounding area.',
      'Discover hidden gems along the trail, such as waterfalls and historic landmarks.',
      'This trail is known for its colorful wildflowers and unique plant life.',
      'An ideal trail for cycling enthusiasts, offering both scenic beauty and exercise.',
      'A popular trail for picnicking and enjoying a day outdoors with family and friends.'
    ]
    descriptions.sample
  end

  # Create an array of trail data near New York City
  trail_data = [
  {
    trail_name: 'Central Park Loop',
    park_name: 'Central Park',
    description: random_description,
    lat: 40.785091,
    lng: -73.968285,
    start_lat: 40.783091,
    start_lng: -73.966285,
    end_lat: 40.787091,
    end_lng: -73.970285,
    difficulty: 'Easy'
  },
  # 2. Hudson River Greenway
  {
    trail_name: 'Hudson River Greenway',
    park_name: 'Hudson River Park',
    description: random_description,
    lat: 40.760936,
    lng: -74.002793,
    start_lat: 40.758936,
    start_lng: -74.000793,
    end_lat: 40.762936,
    end_lng: -74.004793,
    difficulty: 'Moderate'
  },
  {
    trail_name: 'Inwood Hill Park Trail',
    park_name: 'Inwood Hill Park',
    description: random_description,
    lat: 40.872200,
    lng: -73.920776,
    start_lat: 40.870200,
    start_lng: -73.918776,
    end_lat: 40.874200,
    end_lng: -73.922776,
    difficulty: 'Moderate'
  },
  # 9. High Line
  {
    trail_name: 'High Line',
    park_name: 'High Line Park',
    description: random_description,
    lat: 40.748817,
    lng: -74.004830,
    start_lat: 40.746817,
    start_lng: -74.002830,
    end_lat: 40.750817,
    end_lng: -74.006830,
    difficulty: 'Easy'
  },
  # 10. Flushing Meadows Corona Park
  {
    trail_name: 'Flushing Meadows Corona Park',
    park_name: 'Flushing Meadows Corona Park',
    description: random_description,
    lat: 40.749279,
    lng: -73.853256,
    start_lat: 40.747279,
    start_lng: -73.851256,
    end_lat: 40.751279,
    end_lng: -73.855256,
    difficulty: 'Easy'
  },
  # 11. Staten Island Greenbelt
  {
    trail_name: 'Staten Island Greenbelt',
    park_name: 'Staten Island Greenbelt Park',
    description: random_description,
    lat: 40.588373,
    lng: -74.141075,
    start_lat: 40.586373,
    start_lng: -74.139075,
    end_lat: 40.590373,
    end_lng: -74.143075,
    difficulty: 'Hard'
  },
  # 12. QueensWay
  {
    trail_name: 'QueensWay',
    park_name: 'QueensWay Park',
    description: random_description,
    lat: 40.710250,
    lng: -73.852447,
    start_lat: 40.708250,
    start_lng: -73.850447,
    end_lat: 40.712250,
    end_lng: -73.854447,
    difficulty: 'Moderate'
  },
  # 13. Rockaway Beach Boardwalk
  {
    trail_name: 'Rockaway Beach Boardwalk',
    park_name: 'Rockaway Beach Boardwalk Park',
    description: random_description,
    lat: 40.582902,
    lng: -73.816021,
    start_lat: 40.580902,
    start_lng: -73.814021,
    end_lat: 40.584902,
    end_lng: -73.818021,
    difficulty: 'Easy'
  },
  # 3. Prospect Park Loop
  {
    trail_name: 'Prospect Park Loop',
    park_name: 'Prospect Park',
    description: random_description,
    lat: 40.661675,
    lng: -73.971953,
    start_lat: 40.659675,
    start_lng: -73.969953,
    end_lat: 40.663675,
    end_lng: -73.973953,
    difficulty: 'Easy'
  },
  # 4. Bronx River Greenway
  {
    trail_name: 'Bronx River Greenway',
    park_name: 'Bronx River Greenway Park',
    description: random_description,
    lat: 40.891295,
    lng: -73.843206,
    start_lat: 40.889295,
    start_lng: -73.841206,
    end_lat: 40.893295,
    end_lng: -73.845206,
    difficulty: 'Hard'
  },
  # 5. Brooklyn Bridge Walkway
  {
    trail_name: 'Brooklyn Bridge Walkway',
    park_name: 'Brooklyn Bridge Walkway Park',
    description: random_description,
    lat: 40.706086,
    lng: -73.996864,
    start_lat: 40.704086,
    start_lng: -73.994864,
    end_lat: 40.708086,
    end_lng: -73.998864,
    difficulty: 'Easy'
  },
  # 6. East River Park Greenway
  {
    trail_name: 'East River Park Greenway',
    park_name: 'East River Park',
    description: random_description,
    lat: 40.712819,
    lng: -73.974687,
    start_lat: 40.710819,
    start_lng: -73.972687,
    end_lat: 40.714819,
    end_lng: -73.976687,
    difficulty: 'Moderate'
  },
  # 7. Van Cortlandt Park Trail
  {
    trail_name: 'Van Cortlandt Park Trail',
    park_name: 'Van Cortlandt Park',
    description: random_description,
    lat: 40.895861,
    lng: -73.893473,
    start_lat: 40.893861,
    start_lng: -73.891473,
    end_lat: 40.897861,
    end_lng: -73.895473,
    difficulty: 'Moderate'
  }
]

  

  # Create the trails using the data
  trails = []

  trail_data.each do |data|
    trail = Trail.create!(data)
    trails << trail
  end

  puts "#{trails.count} trails created!"


  #Create Trails
  trails.each do |trail|
    users.sample(rand(2..15)).each do |user|
      Review.create!(
        body: Faker::Lorem.sentences(number: rand(1..3)).join(' '),
        rating: rand(1..5),
        trail: trail,
        author: user
      )
    end
  end

  puts "Attaching photos..."
  Trail.all.each_with_index do |trail, index|
    trail.picture.attach(
      io: URI.open("https://fortrails-seeds.s3.amazonaws.com/trail_#{index + 1}.jpg"), 
      filename: "trail#{index + 1}.jpg"
    )
  end


  puts "Done!"
