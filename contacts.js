'use strict'
// contact: name, phone, address, email, image , notes

let contacts = [];
let example = [
    {
        name: "Jess", phone: "05412344567", address: "Nehser", email: "jxss@gmail.com", image: "", notes: null
    },
    {
        name: "sam", phone: "0548765422", address: "Nesher", email: "sams@gmail.com", image: "", notes: null
    },
    {
        name: "nickolas", phone: "0527482915", address: "Haifa", email: "NickolasHEhe@gmail.com", notes: "moved to Haifa recently"
    },
    {
        name: "blum", phone: "0564289571", address: "new york", email: "blum@gmail.com", notes: null
    }];
contacts.push(...example);

const ul = document.getElementById("contacts-list");
let array = contacts.slice(0, 7);
let content = "";
array.forEach(elem => {
    content += `<li id="${elem.phone}" class="contact">
                            <div class="photo"></div>
                            <div><p class="josefin-sans info text">${elem.name}</p></div>
                            <div class="button-menu">
                                <button
                                    class="button josefin-sans">view</button>
                                <button
                                    class="button josefin-sans" onclick=editCon("${elem.phone}")>edit</button>
                                <button class="button josefin-sans" onclick=deleteCont("${elem.phone}")>delete</button>
                            </div>
                        </li>`;
});
ul.innerHTML = content;
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

function deleteCont(phoneNumber) {
    contacts = contacts.filter((user) => user.phone !== phoneNumber)
    document.getElementById(phoneNumber).remove();
}

function refresh() {
    ul.innerHTML = " ";
    let content = "";
    let array = contacts.slice(current, 7);
    array.forEach(elem => {
        content += `<li id="${elem.phone}" class = "contact" >
                            <div class="photo"></div>
                            <p class="josefin-sans info text">${elem.name}</p>
                            <div class="button-menu">
                                <button
                                    class="button josefin-sans">view</button>
                                <button
                                    class="button josefin-sans" onclick=editCon("${elem.phone}")>edit</button>
                                <button class="button josefin-sans" onclick=deleteCont("${elem.phone}")>delete</button>
                            </div >
                        </li > `;
    });
    ul.innerHTML = content;
}
function next() {
    current += 6;
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    if (current >= contacts.length)
        next.classList.add('none-show');
    else
        if (next.classList.contains('none-show'))
            next.classList.remove('none-show');
    if (current == 6)
        prev.classList.add('none-show');
    else
        if (!prev.classList.contains('none-show'))
            prev.classList.add('none-show');
    refresh();
}

function prev() {
    current -= 6;
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    if (current >= contacts.length)
        next.classList.add('none-show');
    else
        if (next.classList.contains('none-show'))
            next.classList.remove('none-show');
    if (current == 6)
        prev.classList.add('none-show');
    else
        if (!prev.classList.contains('none-show'))
            prev.classList.add('none-show');
    refresh();
}

function editCon(phoneNumber) {
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
function closeIX1() {
    const pop = document.getElementById('popup1');
    const ov = document.getElementById('overlay');
    pop.classList.remove('visible');
    ov.classList.remove('visible');
}