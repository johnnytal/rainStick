var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        this.game.load.image('rain', 'assets/images/rain.png');
        this.game.load.image('didgeridoo', 'assets/images/didgeridoo.png');
        game.load.image('gradientHot', 'assets/images/color-gradient-background.jpg');
        game.load.image('gradientCold', 'assets/images/color-gradient-background_cold.jpg');
        
        this.game.load.audio('stick1a', 'assets/audio/stick1a.mp3');
        this.game.load.audio('stick1b', 'assets/audio/stick1b.mp3');
        
        this.game.load.audio('stick2a', 'assets/audio/stick2a.mp3');
        this.game.load.audio('stick2b', 'assets/audio/stick2b.mp3');
        
        this.game.load.audio('stick3a', 'assets/audio/stick3a.mp3');
        this.game.load.audio('stick3b', 'assets/audio/stick3b.mp3');
        
        this.game.load.audio('ambient', 'assets/audio/ambient.mp3');
    },
    
    create: function(){
        this.game.state.start("Game");  
    }
};