# Weave Character Creator
*And probably other things, eventually...*

This is the source code for Lord Joe's Weave character creation website. Here for testing purposes only. The site supports creating new characters and leveling up old ones.

## Pages

### Start
Pick your playset.

### Character Creation Type
Pick whether you want to create a new character or level up an old one.

### New Character
Pick your core suit and the level of your new character.

### Existing Character
Pick your core suit, the current level of your character, the new level of your character, and the character dump from your character sheet.

### Pick Cards and Qualities
Pick the cards you draw and the qualities (backstories, talents, flaws, etc) to make up your character.

### Name
Name your character.

### Character Sheet
The final summary of your character, listing all your:
1. Name
2. Level
3. Core Suit
4. Suit Bonuses
5. Space for Strikes and Wounds
6. Character Config, for use when leveling up your existing character (see Existing Character above)
7. Your character qualities

This page is savable as a `.txt` file and printable.

## TODO
Make character sheet transferrable via URL instead of text file and give player a way to bookmark and manage wounds. Maybe add a place to make challenge rolls too.

After adding a name (during creation or level up) or after importing the character, basically anywhere we redirect to print_character, we instead want to build a querystring full of enough information to build the character (playset, name, level, core suit, quality choices) and send that to view_character (new method). There, we would consume all the querystring information and put it into the session in case the user wants to print their sheet. We'd run everything through all the same stuff we did to get the print_character, omitting the changes we'd have to make to convert current_level to actual_level (we'd do that before the redirect). Then we'd render all the stuff into an interactive character sheet with checkboxes/radio buttons to represent Strikes and Wounds (probably with a New Scene button), a random roll space that calculates things based on the suit bonuses and returns random sets of dice results, and a Print button that sends them to the text character sheet. We don't have to do anything different there except remove the level number conversion because the view_character will already have put everything into the session.
