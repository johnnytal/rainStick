var gameMain = function(game){
	MIDDLE_STATE = false;
	emitter = null;
};

gameMain.prototype = {
    create: function(){  
		rainstick1Sfx = game.add.audio('rainstick1', 1, false);
		rainstick2Sfx = game.add.audio('rainstick2', 1, false);
		
		bgHot = game.add.image(0, 0, 'gradientHot');
		bgCold = game.add.image(0, 0, 'gradientCold');

        
        rainstick = game.add.sprite(0, 0, 'didgeridoo');
        rainstick.scale.set(.65, .65);
        rainstick.anchor.set(.5, .5);
        rainstick.x = game.world.centerX;
        rainstick.y = game.world.centerY;
        
        create_rain();
             	
    	window.addEventListener("devicemotion", readVisherAccel, true);
    },
	update: function(){}
};


function readVisherAccel(event){
	AccelY = event.accelerationIncludingGravity.y;
	
	if (AccelY < -4){
		if (!rainstick1Sfx.isPlaying && MIDDLE_STATE){
			rainstick1Sfx.play();
		}
		rainstick1Sfx._sound.playbackRate.value = Math.abs(AccelY) / 10;
		MIDDLE_STATE = false;
	}
	
	else if (AccelY > 4){
		if (!rainstick2Sfx.isPlaying && MIDDLE_STATE){
			rainstick2Sfx.play();
		}
		rainstick2Sfx._sound.playbackRate.value = Math.abs(AccelY) / 10;
		MIDDLE_STATE = false;
	}
	
	else if (AccelY > -2  && AccelY < 2){
		MIDDLE_STATE = true;
	}
  
	rainstick.angle = Math.abs(AccelY) / 10 * 18;
	
	var alphaVal = (AccelY + 10) / 20;
	if (alphaVal < 0) alphaVal = 0;
	else if (alphaVal > 1) alphaVal = 1;
	
	bgHot.alpha = alphaVal - 0.2;
	bgCold.alpha = 1 - alphaVal - 0.2;
}

function create_rain(){
    emitter = game.add.emitter(0, 0, 1000);

    emitter.width = WIDTH * 2;
    emitter.angle = 0;

    emitter.makeParticles('rain');

    emitter.minParticleScale = 0.4;
    emitter.maxParticleScale = 0.8;

 	emitter.setYSpeed(600, 1100);
    emitter.setXSpeed(-7, 7);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 5, 0);
}
