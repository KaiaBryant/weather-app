console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// Linking event listener to the submit button, which will then invoke the function
// preventDefault prevents page from reloading on it;s own
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // maniputlating HTML to add/link my own text preferences
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    //fetch URL with the location user has input, return and error or return data from location and forecast
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })

})