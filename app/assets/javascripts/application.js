// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .

//= require jquery3
//= require popper
//= require bootstrap

var diceMaster = ["Strike", "Stones", "Gales", "Flames", "Brooks", "Weave"];

function rollDice(stonesBonus, galesBonus, flamesBonus, brooksBonus) {
  var challengeType = $("input[name='suit']:checked").val();
  var isCoreChallenge = $("#iscore").is(":checked");
  var coreSuit = $("#coresuit").val();
  var diceOverride = $("#die_override").val();
  var numDice = 3;
  var rollResult = [];
  var strikes = 0;
  var successes = 0;

  if (diceOverride != '') {
    numDice = parseInt(diceOverride);
  } else {
    if (isCoreChallenge) {
      if (challengeType == coreSuit) {
        numDice++;
      }
    } else {
      switch (challengeType) {
        case "Stones":
          numDice += stonesBonus;
          break;
        case "Gales":
          numDice += galesBonus;
          break;
        case "Flames":
          numDice += flamesBonus;
          break;
        case "Brooks":
          numDice += brooksBonus;
          break;
      }
    }
  }

  numDice = Math.min(numDice, 6);

  for(var i = 0; i < numDice; i++) {
    var newDie = rollDie();
    if (newDie == "Weave") {
      rollResult.push((i+1) + " - " + newDie + " -> ");
    } else {
      rollResult.push((i+1) + " - " + newDie + "\n");
    }

    if (newDie == challengeType || newDie == "Weave") {
      successes++;
    }

    if (newDie == "Strike" && !isCoreChallenge) {
      strikes++;
    }

    while(newDie == "Weave") {
      newDie = rollDie();
      if (newDie == "Weave") {
        rollResult.push(newDie + " -> ");
      } else {
        rollResult.push(newDie + "\n");
      }

      if (newDie == challengeType || newDie == "Weave") {
        successes++;
      }

      if (newDie == "Strike" && !isCoreChallenge) {
        strikes++;
      }
    }
  }

  var rollresult = "Rolling " + numDice + " Dice\n" + successes + " Successes - " + strikes + " Strikes\n" + rollResult.join("");
  $("#rollresult").val(rollresult.trim());
  $("#die_override").val('');
}

function rollDie() {
  return diceMaster[Math.floor(Math.random() * diceMaster.length)];
}

function newScene() {
  $("#strike_0").attr('checked', true);
  $("#strike_0").change();
}

function resetStrikesAndWounds() {
  newScene();
  $("#wound_0").attr('checked', true);
  $("#wound_0").change();
}

function refreshCharacterConfig() {
  var urlParams = new URLSearchParams(location.search);
  var characterConfig = {
    character: $("#characterConfig").val().trim().split("\n"),
    level: urlParams.get("level"),
    name: urlParams.get("name"),
    playset: urlParams.get("playset"),
    suit: urlParams.get("suit")
  };

  window.location.href = "/character?" + $.param(characterConfig);
}

$(document).on('turbolinks:load', function() {
  $(".selector").change(function() {
    $(this).closest(".selector-group").find(".selector-container").removeClass("selected");
    $(this).closest(".selector-group").find(".selector-container-small").removeClass("selected");
    $(this).closest(".selector-group").find(".selector-container-quality").removeClass("selected");
    $(this).parent().addClass("selected");
  });

  $(".selector:checked").parent().addClass("selected");
});
