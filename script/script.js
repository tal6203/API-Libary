let subject_book = document.getElementById("subject_book");
document.getElementById("btn_search").addEventListener("click", async () => {
  let respons = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${subject_book.value}&maxResults=9&printType=books&orderBy=newest`);
  let data = await respons.json();
  if (document.getElementById("result_search").children.length == 0) {
    create_table(data.items);
  }
  else {
    deleteRows();
    create_table(data.items);
  }
});




function create_table(books) {
  const div = document.getElementById('result_search');
  div.innerHTML += ` <div id = "result_table" class="row">
    <div class="card">
      <div class="card-body">
        <h1 style="font-weight: bold;" class="card-title d-flex justify-content-center">Search Results</h1>
        <div class="table-responsive">
          <table id="list_of_book" class="table table-hover">
            <thead>
              <tr>
                <th><i class="fa fa-minus" aria-hidden="true"></i></th>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Binding</th>
                <th>Published Date</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="d-flex justify-content-center">
        <button id="btn_add" type="button" class="btn">
          <i class="fa fa-plus-circle mr-2"></i> Add
        </button>
        </div>
      </div>
    </div>
  </div>`



  for (let i = 0; i < books.length; i++) {
    document.getElementById("list_of_book").innerHTML += `<tr class="tr-update">
    <td><input type="checkbox" class="form-check-input"></td>
    <td>${books[i].volumeInfo.title}</td>
    <td>${books[i].volumeInfo.authors[0]}</td>
    <td>${books[i].volumeInfo.description.split('. ').slice(0, 2).join('. ') + '.'}</td>
    <td><img src="${books[i].volumeInfo.imageLinks.thumbnail}" /></td>
    <td>${books[i].volumeInfo.publishedDate}</td>
    </tr>`
  }
  addBooks();
}


function addBooks() {
  let arr = [];
  let list_of_book = document.querySelectorAll(".form-check-input");
  list_of_book.forEach((e) => {
    e.addEventListener("click", () => {
      if (e.checked) {
        e.parentNode.parentNode.style.backgroundColor = "#5cb85c";
        arr.push({
          title: e.parentNode.parentNode.cells[1].textContent,
          publisher: e.parentNode.parentNode.cells[3].textContent,
          thumbnail: e.parentNode.parentNode.cells[4].querySelector("img").src,
          publishedDate: e.parentNode.parentNode.cells[5].textContent,
        });

      }
      else {
        e.parentNode.parentNode.style.backgroundColor = "white";
        arr = arr.filter(item => item !== e.parentNode.parentNode);
      }
    });
  });
  document.getElementById("btn_add").addEventListener("click", () => {
    if (arr.length > 0) {
      Swal.fire({
        title: 'Add Books',
        text: 'Are you sure you want to add these books?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          arr.forEach((book) => {
            saveBookToLocalStorage(book);
          });
          Swal.fire('Books Added', '', 'success');
          document.getElementById("subject_book").value = "";
          document.getElementById("result_search").removeChild(document.getElementById("result_table"));
        }
      });
    } else {
      Swal.fire('No Books Selected', 'Please select at least one book to add.', 'info');
    }
  });
}

function saveBookToLocalStorage(book) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(book);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

let favorite_btn = document.getElementById("btn_favorites");
favorite_btn.addEventListener("click", () => { window.location.href = "favorites_books.html"; })

let rest_btn = document.getElementById("btn_reset");
rest_btn.addEventListener("click", () => {
  document.getElementById("subject_book").value = "";
  document.getElementById("result_search").removeChild(document.getElementById("result_table"));
})


function deleteRows() {
  document.getElementById("subject_book").value = "";
  document.getElementById("result_search").removeChild(document.getElementById("result_table"));
}
