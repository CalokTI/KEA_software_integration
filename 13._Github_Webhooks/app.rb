require 'sinatra' 
require 'json'

post '/githubwebhook' do
  push = JSON.parse(request.body.read)
  puts "I got some JSON: #{push.inspect}"
end


# commands to run
# gem install sinatra
# ruby app.rb
# nodemon --exec ruby app.rb
# ngrok http 4567