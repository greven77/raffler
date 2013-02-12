Raffler.Collections.Entries = Backbone.Collection.extend({
  url: '/api/entries',
  model: Raffler.Models.Entry,

  drawWinner: function(){
  	winner = this.shuffle()[0];
  	if(winner){
  		winner.win();
  	}
  }

});
