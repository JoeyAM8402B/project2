$(document).ready(() => {
  const url = window.location.href.split('/');
  const bookId = url[url.length - 1];
  console.log('BOOK ID:', bookId)

  function addNote(event){
    event.preventDefault()
    const newNote = $('#new-note').val();
    const newNoteObj = {
      note: newNote,
      BookId: $('#book-title').attr('data-book-id')
    }
    console.log(newNoteObj)
    $.post('/api/note', newNoteObj)
      .then(response => {
        $('#new-note').val('');
        console.log(response)
        getBook()
      })
      .catch(error => console.log(error))
  }

  function deleteNote(event){
    event.preventDefault()
    const id = $(this).attr('data-note-id');

    $.ajax({
      url: '/api/note/' + id,
      method: 'DELETE'
    }).then(response => {
        console.log(response)
        getBook();
      })
      .catch(error => console.log(error))
  }

  function getBook(){
    $('#notes').empty();

    $.get('/api/book/' + bookId)
    .then(response => {
      console.log(response)
      const { id, Author, title, coverPhoto, Notes } = response[0];

      $('#book-image').attr('src', coverPhoto);
      $('#book-title').text(title);
      $('#book-title').attr('data-book-id', id)
      $('#book-author').text(`Author: ${Author.firstName} ${Author.lastName}`);

      for (let i = 0; i < Notes.length; i++) {
        const { id, note } = Notes[i]
        console
        const newNoteDiv = $('<li>').text(note);
        const deleteButton = $(`
          <span>
            <button class="delete-note" data-note-id=${id}>X</button>
          </span>`);
        newNoteDiv.append(deleteButton);
        $('#notes').append(newNoteDiv);
      }
    })
  }


      
      getBook()


    $('#submit-note').on('click', addNote);
    $(document).on('click', '.delete-note', deleteNote)
})