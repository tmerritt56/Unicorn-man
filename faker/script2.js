let btnGen = document.querySelector('button');
btnGen.addEventListener('click', () => {
let info = faker.helpers.createCard();

let {name, email, address: {zipcode, city, country}} = info;
document.querySelector ('#name').value = name;
document.querySelector ('#email').value = email;
document.querySelector ('#city').value = city;
document.querySelector ('#zipcode').value = zipcode;
document.querySelector ('#country').value = country;
});
