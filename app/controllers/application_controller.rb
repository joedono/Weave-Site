class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Playset Selection
  def start_get
    @playsets = YAML.load_file 'data/playsets.yml'
    render 'start'
  end

  def start_post
    session[:playset_name] = params[:playset]
    redirect_to :action => "suits_get"
  end

  # Core Suit and Level
  def suits_get
    render 'suits'
  end

  def suits_post
  end

  # Cards for selecting qualities
  def card_get
    render 'card'
  end

  def card_post
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
