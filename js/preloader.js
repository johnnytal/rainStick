var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        this.game.load.image('rain', 'assets/images/rain.png');
        this.game.load.image('didgeridoo', 'assets/images/didgeridoo.png');
        game.load.image('gradientHot', 'assets/images/color-gradient-background.jpg');
        game.load.image('gradientCold', 'assets/images/color-gradient-background_cold.jpg');
        
        this.game.load.audio('rainStick1', 'assets/audio/rainstick1.mp3');
        this.game.load.audio('rainStick2', 'assets/audio/rainstick2.mp3');
    },
    
    create: function(){
        this.game.state.start("Game");  
    }
};