Raffler.Views.Entry = Backbone.View.extend({
	template: JST['entries/entry'],
	tagName: 'li',

	events: {
		'click': 'showEntry'
	},

	initialize: function(){
		console.log(this.model);
		this.model.on('change', this.render, this);
		this.model.on('highlight', this.highlightWinner, this);
	},

	showEntry: function(){
		Backbone.history.navigate("entries/" + this.model.get('id'), true);
	},

	highlightWinner: function(){
		$('.winner').removeClass('highlight');
		this.$('.winner').addClass('highlight');
	},

	render: function(){
		$(this.el).html(this.template({entry: this.model}));
		return this;
	}
});