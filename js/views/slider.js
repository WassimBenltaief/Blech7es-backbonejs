window.SliderView = Backbone.View.extend({
        
    initialize:function () {
    //console.log('Initializing Slider View');  
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

    });
