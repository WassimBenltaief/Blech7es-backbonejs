window.Track = Backbone.Model.extend({
});

window.TrackCollection = Backbone.Collection.extend({

    model: Track,
	url: 'http://api.soundcloud.com/tracks'

});