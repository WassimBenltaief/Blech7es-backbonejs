window.HomeView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Home View');
        vent.on('fetched', this.Player, this);
        vent.on('track:info', this.info, this);
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    Player : function () {
        // Add Player
        if (!this.playerView) {
            this.playerView = new PlayerView();
            this.playerView.render(window.tracksCollection.at(3));
        }
    },

    info : function(id) {
        //console.log();
        this.OneTrackView = new window.OneTrackView({ model : window.tracksCollection.get(id) });
        // load DOM
        $('#page-content-wrapper').html(this.OneTrackView.el).hide(0).fadeIn(1000);
    }

});

var secondsToTime = function (secs) {
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = minutes+":"+seconds;
    return obj;
}
function updatePosition(){
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
        };

window.PlayerView = Backbone.View.extend({

	initialize:function () {
        console.log('Initializing Player View');
    },

    render:function (model) {
        // initialize sc js sdk
        SC.initialize({
            client_id: "38375d12a650d8319a9f4d8cb4e9fd82"
        });
        //$('#PlayerTitle').text(model.get('title'));

        window.waveform = new Waveform({
            container: document.getElementById("soundcloudPlayer"),
            innerColor: "#5F5F5F",
            height : '50'
          });

        // waveforms js
        SC.get("/tracks/"+model.id, function(track){

          waveform.dataFromSoundCloudTrack(track);
          window.streamOptions = waveform.optionsForSyncedStream({
            playedColor: "#EE3939", 
            loadedColor: "rgba(255, 255, 255, 0.3)",
            defaultColor: "rgba(255, 255, 255, 0.3)",
            autoplay : true
            });

          SC.stream(track.uri, streamOptions, function(stream){
            $('#PlayerTitle').text(model.get('title'));
            window.exampleStream = stream;
            window.exampleStream.togglePause();

            window.updater = setInterval( updatePosition, 1000);
          });
        });
        

        // $(this.el).html("<p>Player</p>");
        return this;
    }

});
