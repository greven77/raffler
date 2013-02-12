Raffler.Views.EntriesIndex = Backbone.View.extend({

  template: JST['entries/index'],

  events: {
  	'submit #new_entry': 'createEntry',
  	'click #draw' : 'drawWinner'
  },

  drawWinner: function(event){
  	event.preventDefault();
  	this.collection.drawWinner();
  },

  initialize: function(){
  	this.collection.on('reset', this.render, this);
  	this.collection.on('add', this.appendEntry, this);
  },

  render: function(){
  	$(this.el).html(this.template());
  	this.collection.each(this.appendEntry);
  	return this;
  },

  appendEntry: function(entry) {
  	view = new Raffler.Views.Entry({model: entry});
  	this.$('#entries').append(view.render().el, this);
  },

  createEntry: function(event){
  	event.preventDefault();
  	attributes = {name: $('#new_entry_name').val()}
  	return this.collection.create(attributes, 
  		{
  			wait: true,
  			success: function(){
  				$('#new_entry')[0].reset();
  			},
  			error: this.handleError
		});
  },

  handleError: function(entry, response){
  	if (response.status == 422){
      console.log("response " + response.responseText);
  		errors = $.parseJSON(response.responseText).errors;
      console.log("this is " + errors);
      for (attribute in errors){
        messages = errors[attribute];
        messages.forEach(function(message){
          alert(attribute + " " + message)
        });
      }
  	}
  }	

});
