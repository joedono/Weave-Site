Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/start', to: 'application#start_get'
  post '/start', to: 'application#start_post'

  get '/menu', to: 'application#menu'

  get '/newcharacter', to: 'application#newcharacter_get'
  post '/newcharacter', to: 'application#newcharacter_post'

  get '/levelupcharacter', to: 'application#levelupcharacter_get'
  post '/levelupcharacter', to: 'application#levelupcharacter_post'

  get '/importcharacter', to: 'application#importcharacter_get'
  post '/importcharacter', to: 'application#importcharacter_post'

  get '/card', to: 'application#card_get'
  post '/card', to: 'application#card_post'

  get '/quality', to: 'application#quality_get'
  post '/quality', to: 'application#quality_post'

  get '/name', to: 'application#name_get'
  post '/name', to: 'application#name_post'

  get '/character.txt', to: 'application#character'
  get '/reset', to: 'application#reset'

  root 'application#start_get'
end
