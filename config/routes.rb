Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/start', to: 'application#start_get'
  post '/start', to: 'application#start_post'

  get '/chartype', to: 'application#chartype'

  get '/newchar', to: 'application#newchar_get'
  post '/newchar', to: 'application#newchar_post'

  get '/existchar', to: 'application#existchar_get'
  post '/existchar', to: 'application#existchar_post'

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
