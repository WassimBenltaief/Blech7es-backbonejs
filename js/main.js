window.Router = Backbone.Router.extend({

    routes: {
        '': 'slider',
        'enregistrements' : 'enreg',
        "track/:id": "info",
        "contact" : "contact",
        "assemble" : "assemble",
        "reservation" : "reservation"
    },

    initialize: function () {
        // SideBar Never Changes, loaded once :
        console.log('router initializer');
        if (!this.homeView) {
            this.homeView = new HomeView();
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        // load DOM
        $("#sidebar-wrapper").html(this.homeView.el);

    },

    slider: function () {
        // Slider View 
        //if (!this.sliderView) {
            this.sliderView = new SliderView();
            this.sliderView.render();
        
        //} else {
        //    this.sliderView.delegateEvents(); // delegate events when the view is recycled
        //}
        $('#page-content-wrapper').html(this.sliderView.el).hide(0).fadeIn(1000);
        $('#top-link').addClass("active");

        $('#portfolio-link').removeClass("active");
        $('#contact-link').removeClass("active");
        $('#assemble-link').removeClass("active");
        $('#reservation-link').removeClass("active");

        $('#slides').superslides({
                  animation: 'fade',
                  animation_speed: 1500,
                  play : 5000,
                  pagination : false
                });
    },

    enreg : function () {
        // Portfolio View
        if(window.tracksCollection===undefined){
            this.navigate('');
        }
        if (!this.portfolioView) {
            this.portfolioView = new PortfolioView();
            this.portfolioView.render();
        }

        $('#page-content-wrapper').html(this.portfolioView.el).hide(0).fadeIn(1500);
        $('#portfolio-link').addClass("active");

        $('#top-link').removeClass("active");
        $('#contact-link').removeClass("active");
        $('#assemble-link').removeClass("active");
        $('#reservation-link').removeClass("active");
        
            // Track View :
            if (!this.tracksView) {
                this.tracksView = new window.TracksView({ collection : window.tracksCollection })
            }
            $('#3').html(this.tracksView.el);

            //genres View :
            if (!this.genresView) {
                this.genresView = new window.GenresView();
            }
            $('#filter').html(this.genresView.el);

        setTimeout(function() {
                if($('.isotopeWrapper').length)
                {

                    var $container = $('.isotopeWrapper');
                    var $resize = $('.isotopeWrapper').attr('id');
                    // initialize isotope
                    $container.isotope({
                        itemSelector: '.isotopeItem',
                        resizable: false, // disable normal resizing
                    });

                    $('#filter a').click(function(){
                        $('#filter a').removeClass('current');
                        $(this).addClass('current');
                        var selector = $(this).attr('data-filter');
                        $container.isotope({
                            filter: selector,
                            animationOptions: {
                                duration: 1000,
                                easing: 'easeOutQuart',
                                queue: false
                            }
                        });
                        return false;
                    });
                    
                    
                    $('#portfoliorow').smartresize(function(){
                        $container.isotope({
                            // update columnWidth to a percentage of container width
                            masonry: {
                                columnWidth: $container.width() / 4
                            }
                        });
                    });
                }
        }, 300);
    },

    info : function(id) {
        vent.trigger("track:info", id);
    },
    contact : function() {
        // Slider View 
        //if (!this.sliderView) {
            this.contactView = new ContactView();
            this.contactView.render();
        
        //} else {
        //    this.sliderView.delegateEvents(); // delegate events when the view is recycled
        //}
        $('#page-content-wrapper').html(this.contactView.el).hide(0).fadeIn(1000);
        $('#contact-link').addClass("active");

        $('#portfolio-link').removeClass("active");
        $('#top-link').removeClass("active");
        $('#assemble-link').removeClass("active");
        $('#reservation-link').removeClass("active");

        //Map code
        // When the window has finished loading create our google map below
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 15,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(36.793304, 10.184186),

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{
                        featureType:"all",
                        elementType:"all",
                        stylers:[{invert_lightness:true},{saturation:10},{lightness:30},{gamma:0.5},{hue:"#EE3939"}]
                    }]
                };
                

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using out element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
                var myLatlng = new google.maps.LatLng(36.793304, 10.184186);

                var icon =  {
                                url: "./img/blech7es-map.png", //url
                                scaledSize: new google.maps.Size(30, 27), //scaled size
                                origin: new google.maps.Point(0,0), //origin
                                anchor: new google.maps.Point(20, 0) //anchor
                            };
                var contentString = '52 Rue 18 Janvier - Tunis';

                var infowindow = new google.maps.InfoWindow({
                  content: contentString
                });

                var marker = new google.maps.Marker({
                      position: myLatlng,
                      map: map,
                      icon : icon,
                      title: 'Blech7es Studio'
                  });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });
                infowindow.open(map,marker);
    },
    assemble: function() {
        // Slider View 
        //if (!this.sliderView) {
            this.assembleView = new AssembleView();
            this.assembleView.render();
        
        //} else {
        //    this.sliderView.delegateEvents(); // delegate events when the view is recycled
        //}
        $('#page-content-wrapper').html(this.assembleView.el).hide(0).fadeIn(1500);
        $('#assemble-link').addClass("active");

        $('#portfolio-link').removeClass("active");
        $('#top-link').removeClass("active");
        $('#contact-link').removeClass("active");
        $('#reservation-link').removeClass("active");

    },
    reservation: function() {
        // Slider View 
        //if (!this.sliderView) {
            this.reservationView = new ReservationView();
            this.reservationView.render();
        
        //} else {
        //    this.sliderView.delegateEvents(); // delegate events when the view is recycled
        //}
        $('#page-content-wrapper').html(this.reservationView.el).hide(0).fadeIn(1500);
        $('#reservation-link').addClass("active");

        $('#portfolio-link').removeClass("active");
        $('#top-link').removeClass("active");
        $('#contact-link').removeClass("active");

    }

});

templateLoader.loadTemplates(["HomeView", "SliderView", "PortfolioView", "TrackView", "GenresView", "OneTrackView", "ContactView", "AssembleView", "ReservationView"],
    function () {
        templateLoader.loadSoundcloud();
    });