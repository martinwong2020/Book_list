let user_library=[];
window.onload=() =>{
    get_data_local()
    if(user_library.length!=0){
        display_book();
    } 
};


function Book(book_name,book_page,status){
    this.name=book_name;
    this.page=book_page;
    this.status=status;
}
function addBookLibrary(name,page,status){
    user_library.push(new Book(name,page,status));
}
let book_form=document.getElementById("book_form");
book_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let book_name=document.getElementById("book_name").value;
    let book_page=document.getElementById("book_page").value;
    let book_status=document.getElementById("check").checked;
    // console.log("stats",book_status);
    addBookLibrary(book_name,book_page,book_status);
    // console.log("click",user_library[0]);
    clear_library();
    display_book();
    save_data_local();
});
// let slide_toggle=document.getElementById("check");
// slide_toggle.addEventListener("click",(e)=>{
//     console.log("click");
// })
function remove_card(e){
    let card=e.target.parentNode;
    e.target.parentNode.parentNode.removeChild(card);
    // console.log("remov",e.target.parentNode.firstChild.nextSibling.innerText);
    remove_card_arr(e.target.parentNode.firstChild.nextSibling.innerText);
    save_data_local();
    
}
function remove_card_arr(name){
    for(let i=0;i<user_library.length;i++){
        if(user_library[i].name==name){
            user_library.splice(i,1);
            break;
        }
    }
    // console.log(user_library);
}
function update_status_arr(name,status){
    for(let i=0;i<user_library.length;i++){
        if(user_library[i].name==name){
            // console.log("b",user_library,user_library[i]);
            user_library[i].status=status;
            // console.log("a",user_library,user_library[i]);
            break;
        }
    }
    save_data_local();
}
function create_book_card(book){
    var book_card=document.createElement("div");
    var book_top=document.createElement("div");
    var book_title=document.createElement("p");
    var book_page=document.createElement("p");
    var remove=document.createElement("p");
    
    //slide and top of the card
    var label_slide=document.createElement("label");
    label_slide.classList.add("switch");
    var input_slide=document.createElement("input");
    input_slide.type="checkbox";
    input_slide.setAttribute("id","check");
    let span_slide=document.createElement("span");
    span_slide.classList.add("slider");
    label_slide.appendChild(input_slide);
    label_slide.appendChild(span_slide);
    book_top.appendChild(label_slide);
    input_slide.onclick=function(e){
        console.log("click",e.target);
        let card_book_title=e.target.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText
        if(book_top.classList.contains("card_incomplete")){
            // console.log("clikc",e.target.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText);
            update_status_arr(card_book_title,true);
            book_top.classList.remove("card_incomplete");
            book_top.classList.add("card_complete");
        }else{
            update_status_arr(card_book_title,false);
            book_top.classList.remove("card_complete");
            book_top.classList.add("card_incomplete");

        }
        // console.log("click",input_slide.value);
    }
    
    book_card.appendChild(book_top);
    book_card.appendChild(book_title);
    book_card.appendChild(book_page);
    
    book_card.classList.add('card_container');
    book_top.classList.add('card_header');
    if(book.status){    
        book_top.classList.add("card_complete");
        input_slide.checked=true;    
    }else{
        book_top.classList.add("card_incomplete");
    }

    //book title
    book_title.innerText=book.name;
    book_title.classList.add('book_title');

    //book page
    book_page.innerText=`Page: ${book.page}`;
    book_page.classList.add("book_page");

    //remove card
    remove.classList.add("remove_card");
    remove.innerText="Remove";
    remove.onclick=remove_card;
    book_card.appendChild(remove);

    

    let body=document.getElementById("body");
    body.appendChild(book_card);

    
}
function clear_library(){
    let body=document.getElementById("body");
    // console.log("here/",body.childNodes);
    while(body.childNodes.length>3){
        body.removeChild(body.lastChild);
    }
    
}
function display_book(){
    for (const book of user_library){
        create_book_card(book);
        // console.log(book.name);
    }
}
function save_data_local(){
    localStorage.setItem("user_library",JSON.stringify(user_library));
}
function get_data_local(){
    let storage=localStorage.getItem("user_library");
    storage=JSON.parse(storage);
    user_library=storage;
}