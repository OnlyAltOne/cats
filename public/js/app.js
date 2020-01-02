const weatherForm = document.querySelector('form')
const messageZero = document.querySelector('#message-0')
const messageOne = document.querySelector('#message-1')
const imageID = document.querySelector('imageID')
const search = document.querySelector('input')

  
messageOne.textContent = ' Cat-rabbit '
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const breed = search.value

    const url = '/image?breed=' + breed
    messageOne.textContent = 'Loading...'
    
    fetch(url).then((responce) => {
        responce.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            }else{
                messageZero.textContent = data.temperament
                messageOne.textContent = data.description
                document.getElementById("imgID").src = data.image_url;
            }
        })
    })
    
})