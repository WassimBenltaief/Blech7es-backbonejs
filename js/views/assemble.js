window.AssembleView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Assemble View');
//        this.template = templates['Contact'];
    },

    render:function () {
        $(this.el).html(this.template());
        console.log(this.el);
        return this;
    }

});