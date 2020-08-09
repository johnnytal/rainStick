var gameMain = function(game){
	emitter = null;
	MIDDLE = true;
	
	playingFile = null;
	
	TINT1 = 0xfff00f;
	TINT2 = 0xf55fff;
};

gameMain.prototype = {
    create: function(){  
		rainstick1Sfx = game.add.audio('rainStick1', 1, false);
		rainstick2Sfx = game.add.audio('rainStick2', 1, false);
		
		bgHot = game.add.image(0, 0, 'gradientHot');
		bgCold = game.add.image(0, 0, 'gradientCold');
        
        rainstick = game.add.sprite(0, 0, 'didgeridoo');
        rainstick.anchor.set(.5, .5);
        rainstick.x = game.world.centerX;
        rainstick.y = game.world.centerY;
        
        create_rain();
             	
    	window.addEventListener("devicemotion", readVisherAccel, true);
    	
    	setTimeout(function(){
    		//initAd();
    		
	        try{
	            window.plugins.insomnia.keepAwake();
	        } catch(e){}   
		}, 100);
    },
	update: function(){}
};


function readVisherAccel(event){
	AccelY = event.accelerationIncludingGravity.y;
	pbValue = Math.abs(AccelY) / 10;
	
	if (AccelY < 0){
		playingFile = rainstick1Sfx;
		if (rainstick2Sfx.isPlaying) rainstick2Sfx.stop();
	}
	else if (AccelY > 0){
		playingFile = rainstick2Sfx;
		if (rainstick1Sfx.isPlaying) rainstick1Sfx.stop();
	}
	
	if (AccelY < -3.5){
		playFile(TINT1);
	}
	
	else if (AccelY > 3.5){
		playFile(TINT2);
	}
	
	else if (AccelY > -3.5 && AccelY < 3.5){
		MIDDLE = true;
		rainstick.tint = 0xffffff;
	}
	
	playingFile.volume = pbValue;
				
    emitter.minParticleScale = pbValue - 0.2;
	emitter.maxParticleScale = pbValue;
  
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
			
	playingFile._sound.playbackRate.value = pbValue + 0.1;
	
	MIDDLE = false;
}

function fadeOut(){
	if (playingFile.volume > 0){
		playingFile.volume -= 0.04;
		
		fadeOut();
	}
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
