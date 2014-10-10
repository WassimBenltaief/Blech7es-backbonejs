window.TracksView = Backbone.View.extend({
	
	initialize: function () {
	this.render();
	},
	
	render : function () {
		//var t = _.template(window.App.Helper.templateSlider);
		this.collection.each(this.addOne, this);
		//console.log($(this.el));
		//this.$el.html(window.App.Helper.templateTracks);
		return this;
	},
	addOne: function(track) {
	    var trackView = new window.TrackView({ model: track });
	    this.$el.append(trackView.render().el);
	}

	});

window.TrackView = Backbone.View.extend({

    tagName : "article",  
    
    initialize:function () {
    },

   	events : {
		'click .track-info': 'info',
		'click .fa-play': 'play'
	},

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    play : function (e){
    	e.preventDefault();
    	if(window.exampleStream.playState){
    	window.exampleStream.togglePause();
    	}
    	var model = this.model;
    	//console.log("play "+this.model.get('title'));
    	SC.get("/tracks/"+model.get('id'), function(track){
          
        	window.waveform.redraw();

          waveform.dataFromSoundCloudTrack(track);
          window.streamOptions = waveform.optionsForSyncedStream({
            playedColor: "rgba(238,57,57, 0.6)", 
            loadedColor: "rgba(255, 255, 255, 0.3)",
            defaultColor: "rgba(255, 255, 255, 0.3)",
            autoplay : true
            });

          SC.stream(track.uri, streamOptions, function(stream){
            window.exampleStream = stream;
            window.exampleStream.play();
            $('#PlayerTitle').text(model.get('title'));
            $('#PlayerCounterPosition').css('left', 0);

            window.updater = setInterval( this.updatePosition, 1000);
          });
        });
    },
    updatePosition : function () {
    	// Do stuff, update timers and transport position
            // player details
            $('#PlayerCounterDuration').text(secondsToTime(window.exampleStream.durationEstimate/1000));
        if(!window.exampleStream.paused){
              $('#PlayerCounterPosition').text(secondsToTime(window.exampleStream.position/1000));

              if(document.getElementById("PlayerCounterPosition").offsetLeft <= $('canvas').width()-16){
              $('#PlayerCounterPosition').css('left', $('canvas').width()*window.exampleStream.position/window.exampleStream.durationEstimate);
                }
          //console.log('Current: '+currentPosition+', Loaded: '+loadedPosition);
          //console.log($('canvas').width()*window.exampleStream.position/window.exampleStream.durationEstimate);
    	}
	}

});


window.GenresView = Backbone.View.extend({
	
	tagName : "ul",

	initialize:function () {
    this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

	});

window.OneTrackView = Backbone.View.extend({

	initialize:function () {
    console.log('Initializing OneTrackView View');
    this.render();
    },

    events : {
		'click .track-info': 'info',
		'click .fa-play': 'play'
	},

    render:function () {
    	window.arrayOfLines = this.model.get('description').split("\n");
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    play : function (e){
    	e.preventDefault();
    	if(window.exampleStream.playState){
    	window.exampleStream.togglePause();
    	}
    	var model = this.model;
    	//console.log("play "+this.model.get('title'));
    	SC.get("/tracks/"+model.get('id'), function(track){
          
        	window.waveform.redraw();

          waveform.dataFromSoundCloudTrack(track);
          window.streamOptions = waveform.optionsForSyncedStream({
            playedColor: "rgba(238,57,57, 0.6)", 
            loadedColor: "rgba(255, 255, 255, 0.3)",
            defaultColor: "rgba(255, 255, 255, 0.3)",
            autoplay : true
            });

          SC.stream(track.uri, streamOptions, function(stream){
            window.exampleStream = stream;
            window.exampleStream.play();
            $('#PlayerTitle').text(model.get('title'));
            $('#PlayerCounterPosition').css('left', 0);

            window.updater = setInterval( this.updatePosition, 1000);
          });
        });
    },
    updatePosition : function () {
    	// Do stuff, update timers and transport position
            // player details
            $('#PlayerCounterDuration').text(secondsToTime(window.exampleStream.durationEstimate/1000));
        if(!window.exampleStream.paused){
              $('#PlayerCounterPosition').text(secondsToTime(window.exampleStream.position/1000));

              if(document.getElementById("PlayerCounterPosition").offsetLeft <= $('canvas').width()-16){
              $('#PlayerCounterPosition').css('left', $('canvas').width()*window.exampleStream.position/window.exampleStream.durationEstimate);
                }
          //console.log('Current: '+currentPosition+', Loaded: '+loadedPosition);
          //console.log($('canvas').width()*window.exampleStream.position/window.exampleStream.durationEstimate);
    	}
	}

});
