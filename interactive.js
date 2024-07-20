'use strict'
function toggleMode() {
    const bg = document.body;
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

function createContact() {
    const pop = document.getElementById('popup');
    const ov = document.getElementById('overlay');
    pop.classList.add('visible');
    ov.classList.add('visible');
}

function closeIX() {
    const pop = document.getElementById('popup');
    const ov = document.getElementById('overlay');
    pop.classList.remove('visible');
    ov.classList.remove('visible');
}