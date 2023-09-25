json.review do
  json.partial! '/api/reviews/review', review: @review
end

json.user do
  json.partial! '/api/users/user', user: @review.author
end

json.trail do 
  json.partial! 'api/trails/trail', trail: @review.trail
end