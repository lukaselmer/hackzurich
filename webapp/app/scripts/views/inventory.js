/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/base',
    'templates',
    'models/inventory',
], function ($, _, Backbone, BaseView, JST, Inventory) {
    'use strict';

    var InventoryView = BaseView.extend({
        template: JST['app/scripts/templates/inventory.ejs'],
 
 
        initialize: function () {
            this.model = new Inventory();
            this.listenTo(this.model, 'change', this.render);
            BaseView.prototype.initialize.call(this);
            this.model.fetch({reset:true});

        },

        events: {
            'click .remove': 'removeItem'
        },

        removeItem: function(e){
            e.preventDefault();
            var self = this;
            $.ajax({
                contentType: 'application/json',
                data: JSON.stringify({inventory:[{ean:$(e.target).closest('a').data('ean')}]}),
                dataType: 'json',
                success: function(data){
                    self.model.fetch();
                },
                error: function(){
                    alert("Device control failed");
                },
                processData: false,
                type: 'DELETE',
                url: window.base_url+'/inventory'
            }); 

        },

        get_data: function(){
            return {ingredients:this.model.toJSON().ingredients};
        }
    });

    return InventoryView;
});
