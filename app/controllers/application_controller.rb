class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Playset Selection
  def start
    @playsets = YAML.load_file 'data/playsets.yml'
  end

  # Core Suit and Level
  def suits
  end

  # Cards for selecting qualities
  def card
  end

  # Character Name
  def name
  end

  # Print/Download Character Sheet
  def download
  end

  private

  def loadPlayset playsetName
    playsets = YAML.load_file 'playsets.yml'
    playsets.each do |key, values|
      if values['title'] == playsetName
        playset = YAML.load_file values['file']
        break
      end
    end

    return playset
  end

end
