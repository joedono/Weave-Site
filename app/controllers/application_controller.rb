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
    desired_level = params[:level].to_i

    if desired_level >= 5
      # Add 1 to account for picking both a Talent and a Flaw at level 5
      desired_level += 1
    end

    # Add 3 to account for picking a Backstory, Talent, Flaw, and Item at level 1
    session[:desired_level] = desired_level + 3

    session[:current_level] = 1;
    redirect_to :action => 'card_get'
  end

  # Select Card
  def card_get
    @cards = @@cards
    @level = getCurrentLevel session[:current_level].to_i
    render 'card'
  end

  def card_post
    session[:current_card] = params[:card]
    redirect_to :action => 'quality_get'
  end

  # Select Quality from Card
  def quality_get
    playset = loadPlayset session[:playset_name]
    @card = session[:current_card]
    currentLevel = session[:current_level].to_i

    case currentLevel
    when 1, 5, 7, 12
      @qualities = playset[@card]['Backstories'];
      @title = 'Pick a Backstory'
    when 2, 6, 8, 10, 13, 14
      @qualities = playset[@card]['Talents']
      @title = 'Pick a Talent'
    when 3, 9
      @qualities = playset[@card]['Flaws']
      @title = 'Pick a Flaw'
    when 11, 15
      @qualities = playset[@card]['Signature Move']
      @title = 'Pick a Signature Move'
    when 4
      @qualities = playset[@card]['Inventory']
      @title = 'Pick an Item'
    end

    @level = getCurrentLevel currentLevel

    render 'quality'
  end

  def quality_post
    character = session[:character].presence || []
    character.push params[:card] + '-' + params[:quality_id]
    session[:character] = character

    currentLevel = session[:current_level].to_i
    desiredLevel = session[:desired_level].to_i

    if currentLevel >= desiredLevel
      redirect_to :action => 'name_get'
    else
      session[:current_level] = currentLevel + 1
      redirect_to :action => 'card_get'
    end
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
  
  def reset
    reset_session
    redirect_to :action => 'start'
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

  def getCurrentLevel level
    if level <= 4
      return 1
    elsif level <= 9
      return level - 3
    else
      return level - 2
    end
  end
end
