console.log("ANVIL LAUNCH IMMINENT. EVACUATE AREA")


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const output = document.querySelector('#output')
const tidbit = document.querySelector('#tidbit')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    tidbit.textContent = 'The Weathermancer peers into his scrying orb. Its contents become a billowing fog...'
    if(search.value == '')
    {
        output.textContent = 'I need a location to scry, stranger.';
        return console.log('empty string was passed')
    }
        
    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location;
    const herokuURL = '/weather?address=' + location;
    console.log('YOU DARE DISTURB THE WEATHERMANCER? ');
    console.log(url)
    output.textContent = 'the fog is still swirling'
    fetch(herokuURL).then((response) => {
    response.json().then((data) => {
        if(data.errorCode)
        {
            output.textContent = data.errorCode;
            return console.log(data.errorCode);
        }
        console.log(data)
        tidbit.textContent = 'The Weathermancer peers into his scrying orb. Its contents become a billowing fog... before clearing to reveal...'
        output.textContent = '\"' + data.forecast + '\"';
    })
})
})