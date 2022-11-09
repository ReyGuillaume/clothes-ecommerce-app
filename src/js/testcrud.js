
const getFormValues = (form, inputClassName) => { 
    let valuesArr = []
    let inputList = form.querySelectorAll(inputClassName)
    inputList.forEach(elt => valuesArr.push(elt.value))
    return valuesArr
}

// ======================= Add Article =======================

const formCreateArticle = document.querySelector(".addArticle")

async function addArticle() {

    // Add an Article to article base

    let valuesArr = getFormValues(formCreateArticle, ".addArticleInput")
    let [name, id_size, id_subcategory, id_gender, id_brand, price, description] = [...valuesArr]
    if ([name, id_size, id_subcategory, id_gender, id_brand, price, description].includes("")) {
        alert("An input is empty")
    } else {
        formCreateArticle.querySelectorAll(".addArticleInput").forEach(elt => elt.value = "")
        let res = []
        await fetch(`./services/sql/Article.crud.php?function=create&name=${name}&id_size=${id_size}&id_subcategory=${id_subcategory}&id_gender=${id_gender}&id_brand=${id_brand}&price=${price}&description=${description}`)
        .then(Response => res = Response)
        .catch(e => console.log(e))
        alert("Article added")
        return res
    }
}

formCreateArticle.querySelector("input[type=submit]").addEventListener("click", addArticle)


// ======================= Read Article =======================

const formReadArticle = document.querySelector(".readArticle")

async function readArticle() {

    // Read an Article to article base

    let valuesArr = getFormValues(formReadArticle, ".readArticleInput")
    let [id] = [...valuesArr]
    if ([id].includes("")) {
        alert("An input is empty")
    } else {
        formReadArticle.querySelectorAll(".readArticleInput").forEach(elt => elt.value = "")
        let res = []
        await fetch(`./services/sql/Article.crud.php?function=read&id=${id}`)
        .then(Response => Response.json())
        .then(Response => res = Response)
        .catch(e => console.log(e))
        alert("Article data fetched")
        return res
    }
}

formReadArticle.querySelector("input[type=submit]").addEventListener("click", () => {
    let truc = readArticle()
    console.log(truc)
})


// ======================= Update Article Data =======================

const formUpdateArticle = document.querySelector(".updateArticle")

async function updateArticle() {

    // Update an Article to article base

    let valuesArr = getFormValues(formUpdateArticle, ".updateArticleInput")
    let [id, name, id_size, id_subcategory, id_gender, id_brand, price, description] = [...valuesArr]
    if ([id, name, id_size, id_subcategory, id_gender, id_brand, price, description].includes("")) {
        alert("An input is empty")
    } else {
        formUpdateArticle.querySelectorAll(".updateArticleInput").forEach(elt => elt.value = "")
        let res = []
        await fetch(`./services/sql/Article.crud.php?function=update&id=${id}&name=${name}&id_size=${id_size}&id_subcategory=${id_subcategory}&id_gender=${id_gender}&id_brand=${id_brand}&price=${price}&description=${description}`)
        .then(Response => res = Response)
        .catch(e => console.log(e))
        alert("Article updated")
        return res
    }
}

formUpdateArticle.querySelector("input[type=submit]").addEventListener("click", updateArticle)


// ======================= Delete Article =======================

const formDeleteArticle = document.querySelector(".deleteArticle")

async function deleteArticle() {

    // Delete an Article to article base

    let valuesArr = getFormValues(formDeleteArticle, ".deleteArticleInput")
    let [id] = [...valuesArr]
    if ([id].includes("")) {
        alert("An input is empty")
    } else {
        formDeleteArticle.querySelectorAll(".deleteArticleInput").forEach(elt => elt.value = "")
        let res = []
        await fetch(`./services/sql/Article.crud.php?function=delete&id=${id}`)
        .then(Response => res = Response)
        .catch(e => console.log(e))
        alert("Article deleted")
        return res
    }
}

formDeleteArticle.querySelector("input[type=submit]").addEventListener("click", deleteArticle)
