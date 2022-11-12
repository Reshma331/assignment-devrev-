var books = [];
var paginationLimit = 10;
fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json')
    .then((response) => response.json())
    .then((json) => { 
		books = json;
		booksMap(json)
	});
	
	
	function booksMap(allBook){
		document.getElementById("paginated-list").innerHTML = "";
		let text = "<li><div>Title</div><div>Author</div><div>Subject</div><div>Publish</div></li>";
		for (let x in allBook) {
		  text += "<li>";
		  text +=  "<div>"+ allBook[x].title +"</div>";
		  text +=  "<div>"+ allBook[x].author +"</div>";
		  text +=  "<div>"+ allBook[x].language +"</div>";
		  text +=  "<div>"+ allBook[x].year +"</div>";
		  text += "</li>";
		}
		document.getElementById("paginated-list").innerHTML = text;
		paginationStart();
		document.getElementById("filterCount").innerText = allBook.length;
		document.getElementById("totalCount").innerText = books.length;
	}
	
	function limit() {
		var x = document.getElementById("pageLimite").value;
		console.log(x);
		paginationLimit = x;
		paginationStart();
	}
	
	function searchTitle() {
		var x = document.getElementById("searchTitle").value;
		
		var newArray = books.filter(function (el) {
			return el.title.toLowerCase().indexOf(x.toLowerCase()) >= 0;
		});
		booksMap(newArray);
	}
	
	function searchSubject() {
		var x = document.getElementById("searchSubject").value;
		
		var newArray = books.filter(function (el) {
			return el.language.toLowerCase().indexOf(x.toLowerCase()) >= 0;
		});
		booksMap(newArray);
	}
	
	function searchPublish() {
		var x = document.getElementById("searchPublish").value;
		
		var newArray = books.filter(function (el) {
			return el.year.toString().toLowerCase().indexOf(x.toString().toLowerCase()) >= 0;
		});
		booksMap(newArray);
	}
	
	function searchType(){
		var x = document.getElementById("searchType").value;
		document.getElementById("searchAuthor").classList.add("hidden");
		document.getElementById("searchSubject").classList.add("hidden");
		document.getElementById("searchPublish").classList.add("hidden");
		document.getElementById("searchTitle").classList.add("hidden");
		if(x === "author"){
			document.getElementById("searchAuthor").classList.add("show");
			document.getElementById("searchAuthor").classList.remove("hidden");
		}else if(x === "subject"){
			document.getElementById("searchSubject").classList.add("show");
			document.getElementById("searchSubject").classList.remove("hidden");
		}else if(x === "publish"){
			document.getElementById("searchPublish").classList.add("show");
			document.getElementById("searchPublish").classList.remove("hidden");
		}else{
			document.getElementById("searchTitle").classList.add("show");
			document.getElementById("searchTitle").classList.remove("hidden");
		}
		
	}
	
	function searchAuthor() {
		var x = document.getElementById("searchAuthor").value;
		console.log(x);
		
		var newArray = books.filter(function (el) {
			return el.author.toLowerCase().indexOf(x.toLowerCase()) >= 0;
		});
		console.log(newArray.length);
		booksMap(newArray);
	}
	
	function paginationStart(bookList){
		const paginationNumbers = document.getElementById("pagination-numbers");
		const paginatedList = document.getElementById("paginated-list");
		const listItems = paginatedList.querySelectorAll("li");
		paginationNumbers.innerHTML = "";
		const pageCount = Math.ceil(listItems.length / paginationLimit);
		let currentPage = 1;

		const appendPageNumber = (index) => {
		  const pageNumber = document.createElement("button");
		  pageNumber.className = "pagination-number";
		  pageNumber.innerHTML = index;
		  pageNumber.setAttribute("page-index", index);
		  pageNumber.setAttribute("aria-label", "Page " + index);

		  paginationNumbers.appendChild(pageNumber);
		};

		const getPaginationNumbers = () => {
		  for (let i = 1; i <= pageCount; i++) {
			appendPageNumber(i);
		  }
		};

		const handleActivePageNumber = () => {
		  document.querySelectorAll(".pagination-number").forEach((button) => {
			button.classList.remove("active");
			const pageIndex = Number(button.getAttribute("page-index"));
			if (pageIndex == currentPage) {
			  button.classList.add("active");
			}
		  });
		};

		const setCurrentPage = (pageNum) => {
		  currentPage = pageNum;
		  handleActivePageNumber();

		  const prevRange = (pageNum - 1) * paginationLimit;
		  const currRange = pageNum * paginationLimit;

		  listItems.forEach((item, index) => {
			item.classList.add("hidden");
			if (index >= prevRange && index < currRange) {
			  item.classList.remove("hidden");
			}
		  });
};



		getPaginationNumbers();
		  setCurrentPage(1);

		  document.querySelectorAll(".pagination-number").forEach((button) => {
			const pageIndex = Number(button.getAttribute("page-index"));

			if (pageIndex) {
			  button.addEventListener("click", () => {
				setCurrentPage(pageIndex);
			  });
			}
		  });
	};