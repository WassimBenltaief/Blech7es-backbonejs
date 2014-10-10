window.PortfolioView = Backbone.View.extend({
        
    initialize:function () {
    console.log('Initializing Portfolio View');
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

    });