# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

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
  random_description = proc { Faker::Lorem.paragraphs(number: rand(1..3)).join("\n\n") }

  # Create an array of trail data near New York City
  trail_data = [
    {
      trail_name: 'Central Park Loop',
      description: random_description.call,
      lat: 40.785091,
      lng: -73.968285
    },
    {
      trail_name: 'Hudson River Greenway',
      description: random_description.call,
      lat: 40.760936,
      lng: -74.002793
    },
    {
      trail_name: 'Prospect Park Trail',
      description: random_description.call,
      lat: 40.661675,
      lng: -73.971953
    },
    {
      trail_name: 'Bronx River Greenway',
      description: random_description.call,
      lat: 40.891295,
      lng: -73.843206
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

  


  puts "Done!"
end