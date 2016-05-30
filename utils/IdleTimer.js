Ext.ns('Plext.timer');


Plext.timer.IdleTimer = function(config) {
    this.addEvents(
        'start',
        'stop',
        'idle',
        'active'
    );    
    Plext.timer.IdleTimer.superclass.constructor.call(this, config);
};
Ext.extend(Plext.timer.IdleTimer, Ext.util.Observable, {

    idle: false,           // indicates if the user is idle
    tId: -1,               // timeout ID
    enabled: false,        // indicates if the idle timer is enabled
    //the amount of time (ms) before the user is considered idle    
    timeout: 1000,

    constructor: function(config){
        
        Ext.apply(this, config);
        Plext.timer.IdleTimer.constructor.call(this);

        if (this.listeners) {
            this.on(this.listeners);
            delete this.listeners;
        };

        // this.initConfig(config);
    },

    destroy: function(){
        this.purgeListeners();
    },

    isRunning: function(){
        return this.enabled;
    },

    isIdle: function(){
        return this.idle;
    },

    setTimeout:function (timeout) {
        this.timeout = timeout;
    },
    getTimeout:function () {
        return this.timeout;
    },

    defer: function(fn, millis, obj, args, appendArgs) {
        fn = Ext.util.Functions.createDelegate(fn, obj, args, appendArgs);
        if (millis > 0) {
            return setInterval(fn, millis);
        }
        fn();
        return 0;
    },    
    start: function(timeout){

        this.enabled = true;
        this.idle = false;

        if (Ext.type(timeout) == "number"){
            this.setTimeout(timeout);
        };

        //assign appropriate event handlers
        Ext.getDoc().on({
            mousemove: this.handleUserEvent,
            keydown: this.handleUserEvent,
            scope: this
        });

        // this.tId = Ext.util.Functions.defer(
        //     this.toggleIdleState, 
        //     this.getTimeout(), 
        //     this
        // );

        this.tId = this.defer(
            this.toggleIdleState, 
            this.getTimeout(), 
            this
        );        
    },

    stop: function(){
        // ..
        this.enabled = false;
        clearTimeout(this.tId);

        //detach the event handlers
        Ext.getDoc().un({
            mousemove: this.handleUserEvent,
            keydown: this.handleUserEvent
        });
    },


    handleUserEvent: function(event){
        // ..
        clearTimeout(this.tId);
        // ...
        if (this.enabled){
            if (this.idle) {
                if (event.type == 'mousemove' && this.activeSwitchCounter < 5) {
                    this.activeSwitchCounter++;
                    return;
                };
                this.activeSwitchCounter = 0;
                this.toggleIdleState();
            };

            // ..
            // this.tId = Ext.util.Functions.defer(
            //     this.toggleIdleState, 
            //     this.getTimeout(), 
            //     this
            // );
            this.tId = this.defer(
                this.toggleIdleState, 
                this.getTimeout(), 
                this
            );                
        };
    },

    toggleIdleState: function(){
        this.idle = !this.idle;
        this.fireEvent(this.idle ? 'idle' : 'active');
    }

});