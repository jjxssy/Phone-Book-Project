'use strict'
// contact: name, phone, address, email, image , notes

let contacts = [];
let currentColor = "#d7909bba";
let currentColorHover = "lightpink";
let toggleLightDark = 0;

// an example of contacts which will display when app opens.
let example = [
    {
        name: "Jess", phone: "05412344567", address: "Nehser", email: "jxss@gmail.com", image: "", notes: ""
    },
    {
        name: "sam", phone: "0548765422", address: "Nesher", email: "sams@gmail.com", image: "", notes: ""
    },
    {
        name: "nickolas", phone: "0527482915", address: "Haifa", email: "NickolasHEhe@gmail.com", notes: "moved to Haifa recently"
    },
    {
        name: "blum", phone: "0564289571", address: "new york", email: "blum@gmail.com", notes: ""
    }];
contacts.push(...example);


// this code will create a list of contacts with all specified elements.
const ul = document.getElementById("contacts-list");
let array = contacts.slice(0, 6);
let content = "";
array.forEach((elem, ind) => {
    const li=document.createElement('li');
    li.id = elem.phone;
    li.classList.add('contact');
    li.innerHTML = ` <div class="photo"></div>
                            <div><p class="josefin-sans info text">${elem.name}</p></div>
                            <div class="button-menu">
                                <button
                                    class="button josefin-sans" onclick=view("${ind}")>view</button>
                                <button
                                    class="button josefin-sans" onclick=editCon("${elem.phone}")>edit</button>
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
    let cont = { name: name, phone: phone, address: address, email: email, image: image !== null ? image.value : "", notes: notes };
    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('address').value = "";
    document.getElementById('email').value = "";
    document.getElementById('notes').value = "";
    contacts.push(cont);
    refresh();
}

function deleteAll() {
    if (confirm("Are you sure you want to delete all of your contacts?") === true) {
        contacts = [];
        refresh();
    }
}

// function will delete a contact with a given phone number.
function deleteCont(phoneNumber) {
    contacts = contacts.filter((user) => user.phone !== phoneNumber)
    document.getElementById(phoneNumber).remove();
}

// function will build the list of contacts again.
function refresh() {
    ul.innerHTML = " ";
    let content = "";
    array= contacts.slice(current, 7);
    array.forEach(elem => {
        const li=document.createElement('li');
        li.id = elem.phone;
        li.classList.add('contact');
        li.innerHTML = `<div class="photo"></div>
                            <p class="josefin-sans info text">${elem.name}</p>
                            <div class="button-menu">
                                <button
                                    class="button josefin-sans" onclick=view("${elem.phoneNumber}")>view</button>
                                <button
                                    class="button josefin-sans" onclick=editCon("${elem.phone}")>edit</button>
                                <button class="button josefin-sans" onclick=deleteCont("${elem.phone}")>delete</button>
                            </div > `;
    ul.append(li);
    attachHover(li);             
    });
}
//edit button
function editCon(phoneNumber) { // edit the contact information pop up
    const contact = contacts.find((contact) => contact.phone === phoneNumber);
    const popup = document.getElementById('popup1');
    const ov = document.getElementById('overlay');
    popup.classList.add('visible');
    ov.classList.add('visible');
    popup.style.display = 'flex';
    popup.querySelector("#name1").value = contact.name;
    popup.querySelector("#phone1").value = contact.phone;
    popup.querySelector("#email1").value = contact.email;
    popup.querySelector("#address1").value = contact.address;
    popup.querySelector("#notes1").value = contact.notes;
}
function closeIX1() { // closing the edit the contact information pop up
    const pop = document.getElementById('popup1');
    const ov = document.getElementById('overlay');
    pop.classList.remove('visible');
    ov.classList.remove('visible');
}
// search bar
function search() {
    let input;
    input = document.querySelector(".search"); // get the search input by class
    const data = contacts.filter((contact)  => contact.name.toUpperCase().startsWith(input.value.toUpperCase()));
    refresh(data);
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




