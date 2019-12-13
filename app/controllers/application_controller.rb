class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  @@cards = [
    'Dawn', 'Stag', 'Owl', 'Serpent', 'Tortoise', 'Mountain', 'Storm', 'Inferno',
    'River', 'Crown', 'Coin', 'Tome', 'Mask', 'Woods', 'Watchtower', 'Gateway',
    'Gallows', 'Assassin', 'Wanderer', 'Architect', 'Herald', 'Dusk'
  ]

  # Playset Selection
  def start_get
    @playsets = YAML.load_file 'data/playsets.yml'
    render 'start'
  end

  def start_post
    session[:playset_name] = params[:playset]
    redirect_to :action => 'suits_get'
  end

  # Core Suit and Level
  def suits_get
    render 'suits'
  end

  def suits_post
    session[:suit] = params[:suit]
    session[:level] = params[:level]
    session[:current_level] = 1;
    redirect_to :action => 'card_get'
  end

  # Select Card
  def card_get
    @cards = @@cards
    render 'card'
  end

  def card_post
    session[:current_card] = params[:card]
    redirect_to :action => 'quality_get'
  end

  # Select Quality from Card
  def quality_get
    # playset = loadPlayset session[:playset_name]
    # chosenCard = session[:current_card]
    # currentLevel = session[:current_level]
    # render 'quality'

    playset = loadPlayset('Iron & Salt')
    chosenCard = 'Stag'
    currentLevel = session[:current_level]

    render html: playset[chosenCard]
  end

  def quality_post
  end

  # Character Name
  def name_get
    render 'name'
  end

  def name_post
  end

  # Print/Download Character Sheet
  def download
    render 'download'
  end

  private

  def loadPlayset playsetName
    chosenPlayset = ''
    playsets = YAML.load_file 'data/playsets.yml'
    playsets.each do |playset|
      if playset['name'] == playsetName
        chosenPlayset = YAML.load_file('data/' + playset['file'])
        break
      end
    end

    return chosenPlayset
  end
end
