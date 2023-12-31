# debugger

json.trail do
   json.partial! 'api/trails/trail', trail: @trail
end



@trail.reviews.includes(:author).each do |review|
  json.reviews do
    json.set! review.id do
      json.partial! 'api/reviews/review', review: review
    end
  end

  json.users do
    json.set! review.author_id do
      json.partial! 'api/users/user', user: review.author
    end
  end
end
