$(document).ready(function() {
  // getMovies();
  // $('.submitBtn').click(addFavorite)
  // $('.removeBtn').click(removeFavorite)
  // $('.deleteBtn').click(deleteMovie)
  // $('.addMovieBtn').click(addMovie)
  $.get('http://localhost:4000/movies')
    .then(getMovies)

}) //closing line 1

function calculateAge(yearOfBirth) {
  var age = 2017 - yearOfBirth;
  return age;
}

var ageJohn = calculateAge(1990);
console.log(ageJohn);

function getMovies(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {

    var title = data[i].title
    var director = data[i].director
    var genre = data[i].genre
    var year = data[i].year_released

    var titleGroup = `<div class = "${title}">
    <h6>${title}</h6>
    </div>`
    var directorGroup = `<div class = "${director}">
    <h6>${director}</h6>
    </div>`
    var genreGroup = `<div class = "${genre}">
    <h6>${genre}</h6>
    </div>`
    var yearGroup = `<div class = "${year}">
    <h6>${year}</h6>
    </div>`

    $('#movieTitles').append(titleGroup)
    $('#director').append(directorGroup)
    $('#genre').append(genreGroup)
    $('#year').append(yearGroup)
  }
} // closing line 13

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
    })
  console.log(id);
}

function addMovie() {
  var title = $('#titleInput').val()
  var director = $('#directorInput').val()
  var genre = $('#genreInput').val()
  var year = $('#yearInput').val()

  var postObj = {}
  postObj.title = title
  postObj.director = director
  postObj.genre = genre
  postObj.year = year



  $.post('https://secret-taiga-92136.herokuapp.com/movies', postObj)

}
