var gameMain = function(game){
	emitter = null;
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
		if (!rainstick1Sfx.isPlaying){
			rainstick1Sfx.play();
			rainstick.tint = 0xfff00f;
		}
		
		if (rainstick2Sfx.isPlaying){
			rainstick2Sfx.stop();
		}
		
		rainstick1Sfx._sound.playbackRate.value = pbValue;
		rainstick1Sfx.volume = pbValue;		
	}
	
	else if (AccelY > 0){
		if (!rainstick2Sfx.isPlaying){
			rainstick2Sfx.play();
			rainstick.tint = 0xf55fff;
		}
		
		if (rainstick1Sfx.isPlaying){
			rainstick1Sfx.stop();
		}
		
		rainstick2Sfx._sound.playbackRate.value = pbValue;
		rainstick2Sfx.volume = pbValue;
	}
				
    emitter.minParticleScale = pbValue - 0.2;
	emitter.maxParticleScale = pbValue;
  
	var alphaVal = (AccelY + 11) / 20;
	if (alphaVal < 0) alphaVal = 0;
	else if (alphaVal > 1) alphaVal = 1;
	
	bgHot.alpha = alphaVal;
	bgCold.alpha = 1 - alphaVal;
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
