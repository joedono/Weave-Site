Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/start', to: 'application#start'
  post '/start', to: 'application#start'

  get '/suits', to: 'application#suits'
  post '/suits', to: 'application#suits'

  get '/card', to: 'application#card'
  post '/card', to: 'application#card'

  get '/name', to: 'application#name'
  post '/name', to: 'application#name'

  get '/download', to: 'application#download'

  root 'application#start'
end
