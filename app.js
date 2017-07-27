$(document).ready(function() {
  getMovies();
  $('.submitbtn').click(addFavorite)
  $('.removebtn').click(removeFavorite)
})
var baseUrl = 'https://secret-taiga-92136.herokuapp.com/movies/'

function getMovies() {
  $.get('https://secret-taiga-92136.herokuapp.com/movies')
    .then(function(data) {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        $('#userInput').append(
          `<option value="${data[i].id}" id="${data[i].id}">${data[i].title}</option>`
        )
      }
    })
}

function addFavorite() {
  var id = $('#userInput option:selected').val()
  $.get(baseUrl + id)
    .then(function(movie) {
      $('#favInput').append(`<option value="${movie[0].id}" id="f${movie[0].id}">${movie[0].title}</option>`)
    })
  console.log(id);
}

function removeFavorite() {
  var id = $('#favInput option:selected').val()
  $.get(baseUrl + id)
    .then(function(movie) {
      $(`#f${movie[0].id}`).remove()
      //$('#favInput').remove(`<option value="${movie[0].id}" id="${movie[0].id}">${movie[0].title}</option>`)
    })
  console.log(id);
}
