const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyUrl = 'http://localhost:3000/toys'
let toyArr;
const toyCollection = document.getElementById("toy-collection")
const submitBtn = document.querySelector(".submit")
const addToyForm = document.querySelector(".add-toy-form")


// YOUR CODE HERE

fetch(toyUrl)
.then(r => r.json())
.then(json => {
  toyArr = json
  renderToys();
})

let renderToys = () => {
  toyCollection.innerHTML = ''

  toyArr.forEach(toy => {
    let div = document.createElement('div')
    div.className = 'card'

    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    let img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    let p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`

    let button = document.createElement('button')
    button.className = "like-btn"
    button.innerText = "Like <3"
    button.dataset.id = `${toy.id}`
    button.dataset.action = 'add-like'

    let donate = document.createElement('button')
    donate.id = 'donate'
    donate.dataset.id = `${toy.id}`
    donate.innerText = 'Donate :('
    donate.className = "like-btn"
    donate.dataset.action = 'donate-toy'

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(donate)

    toyCollection.appendChild(div)
    // console.log(button)
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }


})

addToyForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const inputs = addToyForm.querySelectorAll(".input-text")
  const nameInput = inputs[0]
  const imageInput = inputs[1]
  if (nameInput.value && imageInput.value) {
    fetch(toyUrl, {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body:
      JSON.stringify({
        "name": `${nameInput.value}`,
        "image": `${imageInput.value}`,
        "likes": 0
      })
    })
    .then(r => r.json())
    .then(json => {
      let newToy = json
      toyArr.push(newToy)
      renderToys()
      imageInput.value = ''
      nameInput.value = ''
    })
  }
  else {
    alert ("You must fill out both fields!")
  }
})

toyCollection.addEventListener('click', (ev) => {
  let toyId = parseInt(ev.target.dataset.id)

  if (ev.target.dataset.action === "add-like") {
    let likeCount = parseInt(ev.target.parentNode.querySelector("p").innerText.split(" ")[0])
    let newCount = ++likeCount

    fetch(`${toyUrl}/${toyId}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: `${newCount}`
      })
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
    })

    ev.target.parentNode.querySelector("p").innerText = newCount + " Likes"
  } else if (ev.target.dataset.action === 'donate-toy') {
    fetch(`${toyUrl}/${toyId}`, {
      method: 'DELETE'
    })

    ev.target.parentNode.remove()
  }
})




// OR HERE!
