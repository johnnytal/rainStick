var gameMain = function(game){
	emitter = null;
	MIDDLE = true;
	
	playingFile = null;
	
	TINT1 = 0xfff00f;
	TINT2 = 0xf55fff;
	
	chosen_stick = 1;
};

gameMain.prototype = {
    create: function(){  	
		bgHot = game.add.image(0, 0, 'gradientHot');
		bgCold = game.add.image(0, 0, 'gradientCold');

        rainstick = game.add.sprite(0, 0, 'didgeridoo');
        rainstick.alpha = 0;
        rainstick.anchor.set(.5, .5);
        rainstick.x = game.world.centerX;
        rainstick.y = game.world.centerY;
        rainstick.inputEnabled = true;
        rainstick.events.onInputDown.add(changeRain, this);
        
    	instText = game.add.text(0, 0, 'Tilt your device to play\nTap the rainstick to change sounds\nTap the screen to toggle nature sfx', {
        	font: '22px', fill: 'lightgrey', align: 'center'
   		});
   		
		pleasepleaseMe();

   		instText.anchor.set(.5, .5);
        instText.x = game.world.centerX;
        instText.y = game.world.centerY - 150;

   		instText.alpha = 0;
   		
   		setTimeout(function(){
			game.add.tween(rainstick).to( { alpha: 1 }, 3500, "Linear", true);
			tween = game.add.tween(instText).to( { alpha: 1 }, 1500, "Linear", true);
   		}, 1000);

   		setTimeout(function(){
   			 tween = game.add.tween(instText).to( { alpha: 0 }, 2500, "Linear", true);
   			 
   			 tween.onComplete.add(function(){
   			 	instText.destroy();
   			 }, this);
   		}, 7500);
   		
        
        create_rain();
             	
    	window.addEventListener("devicemotion", readVisherAccel, true);
    	
    	loadSounds();
    	
    	ambientSfx.play();
        
        bgHot.inputEnabled = true;
        bgHot.events.onInputDown.add(function(){
        	if (ambientSfx.isPlaying){
        		ambientSfx.stop();
        	}
        	else{
        		ambientSfx.play();
        	}
        }, this);
    	
    	setTimeout(function(){
    		initAd();
			try{
                StatusBar.hide();
            } catch(e){} 
	        try{
	            window.plugins.insomnia.keepAwake();
	        } catch(e){}   
		}, 100);
    }
};


function readVisherAccel(event){
	AccelY = event.accelerationIncludingGravity.y;
	pbValue = Math.abs(AccelY) / 10;
	
	if (AccelY < 0){
		playingFile = sticks[chosen_stick][0];
		if (sticks[chosen_stick][1].isPlaying) sticks[chosen_stick][1].stop();
	}
	else if (AccelY > 0){
		playingFile = sticks[chosen_stick][1];
		if (sticks[chosen_stick][0].isPlaying) sticks[chosen_stick][0].stop();
	}
	
	if (AccelY < -4){
		playFile(TINT1);
	}
	
	else if (AccelY > 4){
		playFile(TINT2);
	}
	
	else if (AccelY > -4 && AccelY < 4){
		MIDDLE = true;
		rainstick.tint = 0xffffff;
	}
	
	try{
		playingFile.volume = pbValue;
	}catch(e){}
	
    emitter.minParticleScale = 0.1 + pbValue;
	emitter.maxParticleScale = 0.3 + pbValue;
	
 	emitter.setYSpeed(450 + (AccelY * 25), 750 + (AccelY * 25));
  
	var alphaVal = (AccelY + 11) / 20;
	if (alphaVal < 0) alphaVal = 0;
	else if (alphaVal > 1) alphaVal = 1;
	
	bgHot.alpha = alphaVal;
	bgCold.alpha = 1 - alphaVal;
}

function playFile(_tint){
	if (!playingFile.isPlaying && MIDDLE){
		playingFile.play();
		rainstick.tint = _tint;
	}	
			
	playingFile._sound.playbackRate.value = pbValue;
	
	MIDDLE = false;
}

function changeRain(){
	chosen_stick++;
	if (chosen_stick == 3) chosen_stick = 0;
	
	emitter.forEach(function(particle) {  
		particle.tint = sticks[chosen_stick][2];
	});
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

function loadSounds(){
	stick1a = game.add.audio('stick1a', 0.8, false);
	stick1b = game.add.audio('stick1b', 0.8, false);
	
	stick1 = [stick1a, stick1b, 0x000ff0];
	
	stick2a = game.add.audio('stick2a', 0.8, false);
	stick2b = game.add.audio('stick2b', 0.8, false);
	
	stick2 = [stick2a, stick2b, 0xffffff];
	
	stick3a = game.add.audio('stick3a', 0.8, false);
	stick3b = game.add.audio('stick3b', 0.8, false);
	
	stick3 = [stick3a, stick3b, 0x00ff22];
	
	sticks = [stick1, stick2, stick3];
	
	ambientSfx = game.add.audio('ambient', 1, true);
}

function initAd(){
	admobid = {
    	banner: 'ca-app-pub-9795366520625065/7747373408'
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	autoShow: true 
	});
}

function pleasepleaseMe(){
	setTimeout(function(){
   		pleaseText = game.add.text(0, 0, 'If you like it, a positive\nreview will be appreciated :)', {
        	font: '22px', fill: 'lightgrey', align: 'center'
   		});
   		
   		pleaseText.anchor.set(.5, .5);
        pleaseText.x = game.world.centerX;
        pleaseText.y = game.world.centerY - 150;
   		
   		pleaseText.alpha = 0;
		game.add.tween(pleaseText).to( { alpha: 1 }, 1500, "Linear", true);
		
		setTimeout(function(){
			game.add.tween(pleaseText).to( { alpha: 0 }, 1500, "Linear", true);
		}, 5000);
	}, 60000);
	
	setTimeout(function(){
   		pleaseText = game.add.text(0, 0, "Don't forget to check out\nmore apps by iLyichArts! :)", {
        	font: '22px', fill: 'lightgrey', align: 'center'
   		});
   		
   		pleaseText.alpha = 0;
		game.add.tween(pleaseText).to( { alpha: 1 }, 1500, "Linear", true);
		
		setTimeout(function(){
			game.add.tween(pleaseText).to( { alpha: 0 }, 1500, "Linear", true);
		}, 5000);
	}, 120000);
	
	setTimeout(function(){
   		pleaseText = game.add.text(0, 0, "Wow! You should consider\ndoing that for a living!", {
        	font: '22px', fill: 'lightgrey', align: 'center'
   		});
   		
   		pleaseText.alpha = 0;
		game.add.tween(pleaseText).to( { alpha: 1 }, 1500, "Linear", true);
		
		setTimeout(function(){
			game.add.tween(pleaseText).to( { alpha: 0 }, 1500, "Linear", true);
		}, 5000);
	}, 240000);
}
