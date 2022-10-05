
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //gets all the user's id for display by creating a table 
        //from every tweet in the tweetinfo array 
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
              var tbodyEl = $('#namebody');

              tbodyEl.html('');

              response.tweetinfo.forEach(function(tweet) {
                  tbodyEl.append('\
                      <tr>\
                      <td class="id">' + tweet.user.id + '</td>\
                      <td class="id">' + tweet.user.screen_name + '</td>\
                      <td class="id">' + tweet.user.name + '</td>\
                      </tr>\
                  ');
              });
          }
      });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //gets all of the tweets information for display by creating a table
        //from every tweet in the tweetinfo array 
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
              var tbodyEl = $('#tweetbody');
              
              tbodyEl.html('');

              response.tweetinfo.forEach(function(tweet) {
                  tbodyEl.append('\
                      <tr>\
                      <td class="id">' + tweet.id + '</td>\
                      <td class="name">' + tweet.text + '</td>\
                      <td class="name">' + tweet.created_at + '</td>\
                      </tr>\
                  ');
              });
          }
      });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //gets all of the tweet information for display by creating a table
        //from every tweet in the tweetinfo array 
        $.ajax({
          url: '/searchinfo',
          contentType: 'application/json',
          success: function(response) {
              var tbodyEl = $('#searchbody');

              tbodyEl.html('');

              response.searchedtweets.forEach(function(tweet) {
                  tbodyEl.append('\
                      <tr>\
                          <td class="id">' + tweet.id + '</td>\
                          <td class="id">' + tweet.text + '</td>\
                          <td class="id">' + tweet.created_at + '</td>\
                      </tr>\
                  ');
              });
          }
      });
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');
        //creates a tweet by taking in a user string in the format of 
        //ID;TEXT and breaking it into two parts before calling 
        //get-tweets-button for table creation 
        var createString = createInput.val();

        const parsedStrings = createString.split(';');
    
        var createId = parsedStrings[0];
        var createText = parsedStrings[1];

        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({id: createId, text: createText}),
          success: function(response) {
              console.log(response);
              createInput.val('');
              $('#get-tweets-button').click();
          }
      });
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    //creates a searched tweet by taking in a user given tweet id 
    //before calling get-searched-tweets for table creation 
    $.ajax({
      url: '/searchinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({id: userID.val()}),
      success: function(response) {
          console.log(response);
          userID.val('');
          $('#get-searched-tweets').click();
      }
  });

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var givenname = parsedStrings[0];
    var newName = parsedStrings[1];
    newurl = '/tweets/' + givenname,
    //updates the screen name of a given user after given their name 
    //before calling get-button for table update 
    $.ajax({
			url: newurl,
			method: 'PUT',
			data: JSON.stringify( {name: givenname,
			screen_name: newName} ),
			contentType: 'application/json',
			success: function (response) {
				console.log(response);
				updateInput.val(' ')
        $('#get-button').click();
			}
		});
		

  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //deletes a tweet based on a user given id
    //before calling get-tweets-button for table update 
    $.ajax({
			url: '/tweetinfo/' + id.val(),
			method: 'DELETE',
			contentType: 'application/json',
			success: function (response) {
			console.log(response);
      id.val('')
      $('#get-tweets-button').click();
				
			}
		});
		

  });


});


                    
   