Idle Timer for ExtJs 3.4
=============================

Inspired by [Idle Timer](https://github.com/ischenkodv/ExtJs-Idle-Timer) for ExtJS 4 by Dmitri Ischenko.

## Installation
Copy source files to your project, use `Ext.require()` to use it in your application.

## Usage
Create `IdleTimer` object and use `start()` function to start timer. Assign `idle` and/or `active` listeners to perform actions when timer went into idle or active state.

```javascript
IdleTimer =  Ext.extend(Plext.timer.IdleTimer,{
    timeout: 10000, // 10c
    listeners: {
        idle: function(){
            console.log('Application went into idle state');
        },
        active: function(){
            console.log('Application went into active state');
        }
    }
});

var timer = new  IdleTimer();
timer.start();
```


