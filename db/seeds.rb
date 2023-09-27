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
  users = 10.times.map do 
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
    description: random_description,
    lat: 40.785091,
    lng: -73.968285,
    difficulty: 'Easy'
  },
  {
    trail_name: 'Hudson River Greenway',
    description: random_description,
    lat: 40.760936,
    lng: -74.002793,
    difficulty: 'Moderate'
  },
  {
    trail_name: 'Prospect Park Trail',
    description: random_description,
    lat: 40.661675,
    lng: -73.971953,
    difficulty: 'Easy'
  },
  {
    trail_name: 'Bronx River Greenway',
    description: random_description,
    lat: 40.891295,
    lng: -73.843206,
    difficulty: 'Hard'
  },
  {
    trail_name: 'Brooklyn Bridge Walkway',
    description: 'Stroll along the iconic Brooklyn Bridge walkway and take in breathtaking views of the Manhattan skyline.',
    lat: 40.706086,
    lng: -73.996864,
    difficulty: 'Easy'
  },
  {
    trail_name: 'East River Park Greenway',
    description: 'Enjoy a bike ride or jog along the East River Park Greenway, offering beautiful riverfront scenery.',
    lat: 40.712819,
    lng: -73.974687,
    difficulty: 'Moderate'
  },
  {
    trail_name: 'Van Cortlandt Park Trail',
    description: 'Explore the trails of Van Cortlandt Park, featuring wooded areas and the historic Van Cortlandt House Museum.',
    lat: 40.895861,
    lng: -73.893473,
    difficulty: 'Moderate'
  },
  {
    trail_name: 'Jamaica Bay Wildlife Refuge Trail',
    description: 'Discover the rich biodiversity of Jamaica Bay Wildlife Refuge with its birdwatching and marshland trails.',
    lat: 40.615097,
    lng: -73.827187,
    difficulty: 'Easy'
  },
  {
    trail_name: 'Pelham Bay Park Greenway',
    description: 'Cycle through Pelham Bay Park Greenway and enjoy a mix of natural beauty and urban surroundings.',
    lat: 40.858098,
    lng: -73.807855,
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
    users.sample(rand(2..4)).each do |user|
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
