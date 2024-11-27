var bookNameInput = document.getElementById("bookmarkName");
var bookURLInput = document.getElementById("bookmarkURL");

var books= [];

var regex = {
    bookmarkName: /(\w){3,100}/,
    bookmarkURL: /^http(s)?:\/\/(www\.)?(.){1,100}\.(\w){2,5}/
}

var validationInfo = document.getElementById("validationInfo");

if(localStorage.getItem("books") != null){
    books = JSON.parse(localStorage.getItem("books"));
    display();
}

function addBook(){
    if(regex["bookmarkName"].test(bookNameInput.value) && regex["bookmarkURL"].test(bookURLInput.value)){
        var fintName = 0;
        for(var i= 0 ; i<books.length ; i++){
            fintName += (books[i].bName == bookNameInput.value);
        }
        if(fintName){
            alert("Book name already exists");
            return;
        }else{
            var book ={
                bName: bookNameInput.value,
                bURL: bookURLInput.value,
            };
            books.push(book);
            localStorage.setItem("books" , JSON.stringify(books));
            display();
            formReset();
        }
    }else{
        validationInfo.classList.remove("d-none");
    }
}


function display(){
    var dispalyCode= "";
    for(var i = 0 ; i < books.length ; i++){
        dispalyCode +=`
        <tr>
            <td>${i+1}</td>
            <td>${books[i].bName}</td>
            <td>
                <a href="${books[i].bURL}" target="_blank" class="btn vis-btn"><i class="fa-solid pe-2 fa-eye"></i>Visit</a>
            </td>
            <td>
                <button onclick="del(${i})" class="btn del-btn"><i class="fa-solid pe-2 fa-trash"></i>Delete</button>
            </td>
        </tr>
        `
    }

    document.getElementById("tableContent").innerHTML = dispalyCode;
}

function del(index){
    books.splice(index , 1);
    display();
    localStorage.setItem("books" , JSON.stringify(books))
}


function formReset(){
    bookNameInput.value = "";
    bookURLInput.value = "";
}


function validation(elm){

    var x  = regex[elm.id].test(elm.value);
    if(x){
        elm.classList.add("is-valid");
        elm.classList.remove("is-invalid");
    }else{
        elm.classList.remove("is-valid");
        elm.classList.add("is-invalid");
    }
}

function closeInfo(){
    validationInfo.classList.add("d-none");
    validationInfo.classList.remove("d-block");
}