/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  loadTweets();
  $('form').on('submit', handleSubmit);
});

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (tweetObj) => {
  
  const tweet = `<article class="articlehead">
                         <header class="tweetheader">
                        <img src="${tweetObj['user']['avatars']}">
                        <h3>${tweetObj['user']['name']}</h3>
                        <div class="rightname">${tweetObj['user']['handle']}</div>
                      </header>
                      <section class="articlebody">
                        <p>${escape(tweetObj['content']['text'])}</p>
                        <hr>
                      </section>
                      <footer class="articlefooter">
                        <p>${new Date(tweetObj['created_at']).toLocaleString()}</p>
                        <div class="icons">
                          <i class="fas fa-flag"></i>
                          <i class="fas fa-retweet"></i>
                          <i class="fas fa-heart"></i>
                        </div>
                      </footer>
                      </article>`;
  
  return tweet;
};


const renderTweets = function(data) {
  $('#tweet-container').empty();
  for (let userobj of data) {
    let $tweet = createTweetElement(userobj);
    $('#tweet-container').prepend($tweet);
  }
};

const handleSubmit = function(event)  {
  event.preventDefault();
  let data = $(this).serialize();
  
  if ($('#tweet-text').val() === '') {
    $('#errornull').slideDown();
  } else if ($('#tweet-text').val().length > 140) {
    $('#errorlong').slideDown();
  } else {
    
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: data
    })
      .then(res => {
        console.log('sent to tweets', res);
        loadTweets();
        $('#tweet-text').val('') 
        $('.counter').text(140)
               
      })
      .catch(err => console.log(err));
  }
};

const loadTweets = () =>{
  $('#errorlong').hide();
  $('#errornull').hide();
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
    .then(res => {
      renderTweets(res);
    })
    .catch(err => console.log(err));
};





