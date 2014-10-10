// The Template Loader. Used to asynchronously load templates located in separate .html files
window.vent = _.extend({}, Backbone.Events);
window.templateLoader = {

    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },

    loadSoundcloud : function () {
        
        window.tracksCollection = new window.TrackCollection();
        
        window.tracksCollection.fetch({

        data:   {
                format: 'json',
                client_id: '38375d12a650d8319a9f4d8cb4e9fd82',
                user_id : '78685512'
                },
        
        success: function(){
            app = new Router();
            Backbone.history.start();
            var genres = [];
            window.tracksCollection.each(function(track){
                genres.push(track.get('genre'));
            });
            window.Genres = _.uniq(genres);
            //console.log(Genres);
            window.vent.trigger("fetched");

            
        }

        });

        
    }



};


// Portfolio One Track View 
(function() {
  $(window).scroll(function() {
    var oVal;
    oVal = $(window).scrollTop() / 240;
    $("#myheader").css("opacity", 1 - oVal);
    $("#mynav").css("opacity", 1 - oVal);
    return $(".blur").css("opacity", oVal);
  });

}).call(this);

$("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });