const searchValue = document.querySelector('input')
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    const location = searchValue.value
    fetch('/weather?adress=' + searchValue.value).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})