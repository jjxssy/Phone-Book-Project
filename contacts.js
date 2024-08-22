'use strict'
// contact: name, phone, address, email, image , notes

let contacts = [];
let currentColor = "#d7909bba";
let currentColorHover = "lightpink";
let toggleLightDark = 0;
let defaultImg ="https://github.com/jjxssy/Phone-Book-Project/blob/main/contact-icon.png?raw=true";

// an example of contacts which will display when app opens.
let example = [
    {
        name: "Jess", phone: "05412344567", address: "Nehser", email: "jxss@gmail.com", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1024px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg", notes: ""
    },
    {
        name: "sam", phone: "0548765422", address: "Nesher", email: "sams@gmail.com", image: "", notes: ""
    },
    {
        name: "nickolas", phone: "0527482915", address: "Haifa", email: "NickolasHEhe@gmail.com", image: "", notes: "moved to Haifa recently"
    },
    {
        name: "blum", phone: "0564289571", address: "new york", email: "blum@gmail.com", image: "", notes: ""
    }];
contacts.push(...example);


// this code will create a list of contacts with all specified elements.
const ul = document.getElementById("contacts-list");
let content = "";
contacts.forEach((elem, ind) => {
    const li=document.createElement('li');
    li.id = elem.phone;
    li.classList.add('contact');
    li.innerHTML = ` <img src="${(elem.image===""?defaultImg:elem.image)}" class="photo"></img>
                            <div><p class="josefin-sans info text">${elem.name}</p></div>
                            <div class="button-menu">
                                <button
                                    class="button josefin-sans" onclick=view("${ind}")>view</button>
                                <button
                                    class="button josefin-sans" onclick=editCon("${ind}")>edit</button>
                                <button class="button josefin-sans" onclick=deleteCont("${elem.phone}")>delete</button>
                            </div>
                        `;
    ul.append(li);
    attachHover(li);
});

function toggleMode() { // toggling between light and dark mode
    const bg = document.body;

    toggleLightDark = toggleLightDark == 0 ? 1 : 0;

    if (toggleLightDark == 0) // light mode
    {
        currentColor = "#d7909bba";
        currentColorHover = "lightpink";
    }
    else // dark mode
    {
        currentColor = "#3e1f4196";
        currentColorHover = "#713e75c7";
    }
    
    bg.classList.toggle('background-container2');
    const buttons = document.querySelectorAll('.button-sectdes');
    buttons.forEach(element => element.classList.toggle('button-sectdes2'));
    buttons.forEach(element => element.classList.toggle('info2'));
    const contactButtons = document.querySelectorAll('.button');
    contactButtons.forEach(element => element.classList.toggle('button2'));
    contactButtons.forEach(element => element.classList.toggle('info2'));
    const book = document.querySelector('.book');
    book.classList.toggle('book2');
    const borderPhoto = document.querySelectorAll('.photo');
    borderPhoto.forEach(element => element.classList.toggle('darkmode-border'));
    const borderContact = document.querySelectorAll('.contact');
    borderContact.forEach(element => element.classList.toggle('darkmode-border'));
    const textColor = document.querySelectorAll('.info');
    textColor.forEach(element => element.classList.toggle('info2'));
}

function createContact() { // showing the create contact pop up
    const pop = document.getElementById('popup');
    const ov = document.getElementById('overlay');
    pop.classList.add('visible');
    ov.classList.add('visible');
}

function closeIX() {  // hiding the create contact pop up
    const pop = document.getElementById('popup');
    const ov = document.getElementById('overlay');
    pop.classList.remove('visible');
    ov.classList.remove('visible');
}

// function will attach mouseover, mouseout events on a given element.
function attachHover(item)
{
    item.addEventListener('mouseover',(e) => {e.currentTarget.style.backgroundColor= currentColor});
    item.addEventListener('mouseout',(e) => {e.currentTarget.style.backgroundColor= currentColorHover});
}


let current = 0;
function save(e) {
    e.preventDefault();
    const pop = document.getElementById('popup');
    const ov = document.getElementById('overlay');
    pop.classList.remove('visible');
    ov.classList.remove('visible');
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;
    let image = document.getElementById('image');
    let notes = document.getElementById('notes').value;

    if (!name || !phone)
    {
        alert("You must fill name and phone number fields in order to create a contact")
        return;
    }

    let cont = { name: name, phone: phone, address: address, email: email, image: image !== null ? image : defaultImg, notes: notes };
    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('address').value = "";
    document.getElementById('email').value = "";
    document.getElementById('notes').value = "";

    contacts.push(cont);
    refresh(contacts);
}
// function to delete all the contacts in the phonebo
function deleteAll() {
    if (confirm("Are you sure you want to delete all of your contacts?") === true) {
        contacts = [];
        refresh(contacts);
    }
}

// function will delete a contact with a given phone number.
function deleteCont(phoneNumber) {
    contacts = contacts.filter((user) => user.phone !== phoneNumber)
    document.getElementById(phoneNumber).remove();
}

// function will build the list of contacts again.
function refresh(data) {
    ul.innerHTML = "";
    data.forEach((elem, ind) => {
        const li=document.createElement('li');
        li.id = elem.phone;
        li.classList.add('contact');
        li.innerHTML = ` <img src="${(elem.image===""?defaultImg:elem.image)}" class="photo"></img>
                            <div><p class="josefin-sans info text">${elem.name}</p></div>
                            <div class="button-menu">
                                <button
                                    class="button josefin-sans" onclick=view("${ind}")>view</button>
                                <button
                                    class="button josefin-sans" onclick=editCon("${ind}")>edit</button>
                                <button class="button josefin-sans" onclick=deleteCont("${elem.phone}")>delete</button>
                            </div>
                        `;
    ul.append(li);
    attachHover(li);             
    });
}
//edit button
function editCon(index) { // edit the contact information pop up
    const popup = document.getElementById('popup1');
    const ov = document.getElementById('overlay');
    popup.classList.add('visible');
    ov.classList.add('visible');
    popup.style.display = 'flex';
    popup.querySelector("#name1").value = contacts[index].name;
    popup.querySelector("#phone1").value = contacts[index].phone;
    popup.querySelector("#email1").value = contacts[index].email;
    popup.querySelector("#address1").value = contacts[index].address;
    popup.querySelector("#fileImg1").value = contacts[index].image || "";
    popup.querySelector("#notes1").value = contacts[index].notes || "";
}

function saveEdit(e){
    e.preventDefault();
    const popup = document.getElementById('popup1');
    const ov = document.getElementById('overlay');
    let name = popup.querySelector("#name1").value;
    let phone = popup.querySelector("#phone1").value;
    let email = popup.querySelector("#email1").value;
    let address = popup.querySelector("#address1").value;

    if (!name || !phone || !email || !address)
    {
        alert("One or more of the following fields must be filled.");
        return;
    }

    popup.classList.remove('visible');
    ov.classList.remove('visible');

    let ind = contacts.findIndex(contact => contact.phone === phone);
    if (ind != -1)
    {
        contacts[ind].name = name;
        contacts[ind].phone = phone;
        contacts[ind].email = email;
        contacts[ind].address = address;
        contacts[ind].image = popup.querySelector("#fileImg1").value || "";
        contacts[ind].notes = popup.querySelector("#notes1").value || "";
        refresh(contacts);
    }
    else
    {
        alert(`A contact with a given phone number ${phone} doesn't exist, so you can't edit.`)   
    }
}

function closeIX1() { // closing the edit the contact information pop up
    const pop = document.getElementById('popup1');
    const ov = document.getElementById('overlay');
    pop.classList.remove('visible');
    ov.classList.remove('visible');
}
// search bar
function search() {
    let input = document.querySelector(".search"); // get the search input by class

    input.addEventListener("input", (e) => {
        const data = contacts.filter((contact)  => contact.name.toUpperCase().startsWith(e.target.value.toUpperCase()));
        refresh(data);
    })
}

//button view
function view(index){
    //const contact = contacts.find((cnt) => cnt.phone === phoneNumber);

    const popup = document.getElementById('popup2');
    const ov = document.getElementById('overlay');
    let content = document.getElementById('details');
    popup.classList.add('visible');
    ov.classList.add('visible');
    popup.style.display = 'flex';
    content.innerHTML=`
            <p>Full Name: ${contacts[index].name}</p>
            <p>Phone Number: ${contacts[index].phone}</p>
            <p>Address: ${contacts[index].address}</p>
            <p>Email: ${contacts[index].email}</p>
            <p>Notes: ${contacts[index].notes}</p>
    `;
}
// closing poppup
function closeIX2() {
    const pop = document.getElementById('popup2');
    const ov = document.getElementById('overlay');
    pop.classList.remove('visible');
    ov.classList.remove('visible');
}




