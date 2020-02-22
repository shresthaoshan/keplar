let suggestions = false
const requestServer = e => {
    console.log(e.key)
    let el = document.getElementById('search')
    let ul = document.getElementById("suggestions")
    let searchValue = el.value
    if (searchValue) {
        axios({
            method: "POST",
            url: "/api/search-suggestions",
            data: {
                userInput: searchValue
            }
        })
        .then(response => {
            suggestions = true
            ul.innerHTML = ""
            ul.classList.remove("hide")
            if (response.data.suggestions.length > 0) {
                response.data.suggestions.forEach(i => {
                    let li = document.createElement('li')
                    let aTag = document.createElement('a')
                    aTag.setAttribute('href', `/${i}`)
                    aTag.innerText = i
                    li.appendChild(aTag)
                    ul.appendChild(li)
                })
            } else {
                let li = document.createElement('li')
                li.innerHTML = "No suggestions"
                li.classList.add("no-suggestion")
                ul.appendChild(li)
            }
            console.log(response)
        })
        .catch(err => console.log(err))
    } else {
        ul.innerHTML = ""
        ul.classList.add("hide")
    }
}
const goToSearch = e => {
    if (e.key == "Enter") {
        let el = document.getElementById('search')
        if (el.value)
            window.location.assign('/' + el.value)
    }
}
const goToSearchMobile = e => {
    let el = document.getElementById('search')
    if (el.value)
        window.location.assign('/' + el.value)
}

const showInfo = e => {
    e.preventDefault()
    e.path[2].children[0].children[1].classList.toggle("opaque")
}

document.getElementById("info").addEventListener("click", showInfo)
document.getElementById('search').addEventListener("keyup", requestServer)
document.getElementById('search').addEventListener("keyup", goToSearch)
document.getElementById('search-icon').addEventListener("click", goToSearchMobile)
document.getElementById('search-icon').addEventListener("touchstart", goToSearchMobile)

document.getElementById('search').addEventListener("focus", () => suggestions ? document.getElementById("suggestions").classList.remove("hide") : 0)