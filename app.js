$(document).ready(function() {
  $.get(baseUrl)
    .then(getMovies)


  $('.deleteBtn').click(removeMovie)
  $('.editBtn').click(editMovie)

}) //closing line 1

var baseUrl = 'https://secret-taiga-92136.herokuapp.com/movies'
// const baseUrl = 'http://localhost:4000/movies/'

function addMovie(event) {

  var postObj = {
    title: $('#titleInput').val(),
    director: $('#directorInput').val(),
    genre: $('#genreInput').val(),
    year: $('#yearInput').val()
  }


  $.post(baseUrl, postObj)
    .then(function(res) {
    })
  .then(data => {
    window.location.reload()
  })
} // closing line 10

function getMovies(data) {
  for (var i = 0; i < data.length; i++) {

    var title = data[i].title
    var director = data[i].director
    var genre = data[i].genre
    var year = data[i].year_released
    var id = data[i].id

    var titleGroup = `<div class = "${id}">
    <h6>${title}</h6>
    </div>`
    var directorGroup = `<div class = "${id}">
    <h6>${director}</h6>
    </div>`
    var genreGroup = `<div class = "${id}">
    <h6>${genre}</h6>
    </div>`
    var yearGroup = `<div class = "${id}">
    <h6>${year}</h6>
    </div>`
    var dropTitle = `<option data-title= "${title}" data-director= "${director}" data-genre= "${genre}" data-year= "${year}" class= "${id}" id= ${id} value= "${title}">${title}</option>`

    $('#userInput').append(dropTitle)

  }
  $('#userInput').change(appendMovieToTable)
  $('.addMovieBtn').click(addMovie)
} // closing line 29

function removeMovie() {
  var id = $('#userInput option:selected').attr("id")
  $.ajax({
    url: baseUrl + id,
    method: "DELETE"
  })
    .then(function(movie) {
       $(`.${movie.deleted[0].id}`).remove()
    })
}

function appendMovieToTable() {
  var title = $('#userInput option:selected').attr('data-title');
  var director = $('#userInput option:selected').attr('data-director');
  var genre = $('#userInput option:selected').attr('data-genre');
  var year = $('#userInput option:selected').attr('data-year');
  var id = $('#userInput option:selected').attr('id');

  var titleHTML = `<td><div class = "${id} title"><h6>${title}</h6></div></td>`
  var directorHTML = `<td><div class = "${id} director"><h6>${director}</h6></div></td>`
  var genreHTML = `<td><div class = "${id} genre"><h6>${genre}</h6></div></td>`
  var yearHTML = `<td><div class = "${id} year"><h6>${year}</h6></div></td>`

  $('tbody').append(`
    <tr>
      ${titleHTML}
      ${directorHTML}
      ${genreHTML}
      ${yearHTML}
    </tr>
    `)
  populateEditFields(title, director, genre, year, id)
}

function populateEditFields(title, director, genre, year, id) {
  $('.editTitle').val(title)
  $('.editDirector').val(director)
  $('.editGenre').val(genre)
  $('.editYear').val(year)

}

function editMovie() {
  var title = $('.editTitle').val()
  var director = $('.editDirector').val()
  var genre = $('.editGenre').val()
  var year = $('.editYear').val()
  var id = $('#userInput option:selected').attr('id');
  var editObj = {
    title: title,
    director: director,
    genre: genre,
    year_released: year
  }
  $.ajax({
    url: baseUrl + '/' + id,
    method: "PUT",
    data: editObj
  })
  .then(function(edited){
    var title = edited[0].title
    var director = edited[0].director
    var genre = edited[0].genre
    var year = edited[0].year_released
    var id = edited[0].id

    $(`.${id}.title`).text(title)
    $(`.${id}.director`).text(director)
    $(`.${id}.genre`).text(genre)
    $(`.${id}.year`).text(year)

  })
}
