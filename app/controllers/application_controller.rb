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
    redirect_to start_url and return if params[:playset] == nil

    session[:playset_name] = params[:playset]
    redirect_to menu_url
  end

  def menu
    render 'menu'
  end

  # Core Suit and Level
  def newcharacter_get
    render 'newcharacter'
  end

  def newcharacter_post
    redirect_to suits_url and return if params[:suit] == nil or params[:level] == nil

    session[:suit] = params[:suit]
    desired_level = params[:level].to_i

    if desired_level >= 5
      # Add 1 to account for picking both a Talent and a Flaw at level 5
      desired_level += 1
    end

    # Add 3 to account for picking a Backstory, Talent, Flaw, and Item at level 1
    session[:desired_level] = desired_level + 3

    session[:current_level] = 1;
    redirect_to card_url
  end

  def levelupcharacter_get
    render 'levelupcharacter'
  end

  def levelupcharacter_post
    session[:suit] = params[:suit]
    current_level = params[:current_level].to_i
    desired_level = params[:desired_level].to_i

    if current_level >= 5
      # Add 1 to account for picking both a Talent and a Flaw at level 5
      current_level += 1
    end

    if desired_level >= 5
      # Add 1 to account for picking both a Talent and a Flaw at level 5
      desired_level += 1
    end

    # Add 3 to account for picking a Backstory, Talent, Flaw, and Item at level 1
    session[:current_level] = current_level + 4
    session[:desired_level] = desired_level + 3

    session[:character] = params[:char_import].split("\n")

    redirect_to card_url
  end

  def importcharacter_get
    render 'importcharacter'
  end

  def importcharacter_post
    session[:name] = params[:name]
    session[:suit] = params[:suit]
    session[:character] = params[:character].split("\n")

    current_level = params[:current_level].to_i

    if current_level >= 5
      # Add 1 to account for picking both a Talent and a Flaw at level 5
      current_level += 1
    end

    # Add 3 to account for picking a Backstory, Talent, Flaw, and Item at level 1
    session[:current_level] = current_level + 3

    redirect_to action: 'print_character'
  end

  # Select Card
  def card_get
    @cards = @@cards
    @level = getCurrentLevel session[:current_level].to_i
    render 'card'
  end

  def card_post
    redirect_to card_url and return if params[:card] == nil

    session[:current_card] = params[:card]
    redirect_to quality_url
  end

  # Select Quality from Card
  def quality_get
    playset = loadPlayset session[:playset_name]
    @card = session[:current_card]
    currentLevel = session[:current_level].to_i

    case currentLevel
    when 1, 5, 7, 12
      @qualityType = 'Backstories'
      @qualities = playset[@card]['Backstories']
      @title = 'Pick a Backstory'
    when 2, 6, 8, 10, 13, 14
      @qualityType = 'Talents'
      @qualities = playset[@card]['Talents']
      @title = 'Pick a Talent'
    when 3, 9
      @qualityType = 'Flaws'
      @qualities = playset[@card]['Flaws']
      @title = 'Pick a Flaw'
    when 11, 15
      @qualityType = 'Signature Move'
      @qualities = playset[@card]['Signature Move']
      @title = 'Pick a Signature Move'
    when 4
      @qualityType = 'Inventory'
      @qualities = playset[@card]['Inventory']
      @title = 'Pick an Item'
    end

    @level = getCurrentLevel currentLevel

    render 'quality'
  end

  def quality_post
    redirect_to quality_url and return if params[:quality_id] == nil

    character = session[:character].presence || []
    character.push params[:card] + '-' + params[:quality_type] + '-' + params[:quality_id]
    session[:character] = character

    currentLevel = session[:current_level].to_i
    desiredLevel = session[:desired_level].to_i

    if currentLevel >= desiredLevel
      redirect_to name_url
    else
      session[:current_level] = currentLevel + 1
      redirect_to card_url
    end
  end

  # Character Name
  def name_get
    render 'name'
  end

  def name_post
    redirect_to name_url and return if params[:name] == nil

    session[:name] = params[:name]
    redirect_to action: 'print_character'
  end

  # Character Sheet
  def print_character
    @name = session[:name]
    @level = getCurrentLevel session[:current_level].to_i
    @suit = session[:suit]

    @characterChoices = session[:character]
    @playset = loadPlayset session[:playset_name]

    @character = {}
    @character['Backstories'] = []
    @character['Talents'] = []
    @character['Flaws'] = []
    @character['Signature Move'] = []
    @character['Inventory'] = []

    @characterChoices.each do |choice|
      selections = choice.split('-')
      cardName = selections[0]
      qualityType = selections[1]
      qualityId = selections[2].to_i
      quality = {}

      qualityPool = @playset[selections[0]][qualityType]

      qualityPool.each do |qualityOption|
        if qualityOption['id'].to_i == qualityId
          quality = qualityOption
        end
      end

      @character[qualityType].push(quality)
    end

    @stonesBonus = 0
    @galesBonus = 0
    @flamesBonus = 0
    @brooksBonus = 0

    case @suit
    when 'Stones'
      @stonesBonus = @stonesBonus + 1
    when 'Gales'
      @galesBonus = @galesBonus + 1
    when 'Flames'
      @flamesBonus = @flamesBonus + 1
    when 'Brooks'
      @brooksBonus = @brooksBonus + 1
    end

    @character['Backstories'].each do |backstory|
      suits = backstory['subQualities'][0]['description'].split(' ')
      suits.each do |suit|
        case suit
        when 'STONES'
          @stonesBonus = @stonesBonus + 1
        when 'GALES'
          @galesBonus = @galesBonus + 1
        when 'FLAMES'
          @flamesBonus = @flamesBonus + 1
        when 'BROOKS'
          @brooksBonus = @brooksBonus + 1
        end
      end
    end

    render 'character'
  end

  def reset
    reset_session
    redirect_to start_url
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
    elsif level <= 8
      return level - 3
    else
      return level - 4
    end
  end
end
