/*=======================================
=            Global App View            =
=======================================*/


window.App.Views.Enregistrements = Backbone.View.extend({
		el : "#page-content-wrapper",
		initialize: function () {
        this.render();
    	},
		render : function () {
			this.$el.html(window.App.Helper.templateEnregistrement);
			var tracksView= new window.App.Views.Tracks({collection: this.collection });
		}
});

window.App.Views.Tracks = Backbone.View.extend({
		el : "#3",
		initialize: function () {
        this.render();
        //console.log(this.el);
    	},
		render : function () {
			//var t = _.template(window.App.Helper.templateSlider);
			this.collection.each(this.addOne, this);
			//this.$el.html(window.App.Helper.templateTracks);
			return this;
		},
		addOne: function(track) {
		    var trackView = new window.App.Views.Track({ model: track });
		    this.$el.append(trackView.render().el);
		  }

	});

window.App.Views.Track = Backbone.View.extend({
  tagName: 'article',
  template: window.App.Helper.templateTrack,
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

window.App.Views.Assemble = Backbone.View.extend({
		el : "#page-content-wrapper",
		initialize: function () {
        this.render();
    	},
		render : function () {
			//var t = _.template(window.App.Helper.templateSlider);
			this.$el.html(window.App.Helper.templateAssemble());
			return this;
		}

	});