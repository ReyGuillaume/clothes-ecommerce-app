
const getFormValues = (form, inputClassName) => { 
    let valuesArr = []
    let inputList = form.querySelectorAll(inputClassName)
    inputList.forEach(elt => valuesArr.push(elt.value))
    return valuesArr
}

async function executePhp (form, inputClassName, variables, url) {
    if ([...variables].includes("")) {
        alert("An input is empty")
        return
    } else {
        form.querySelectorAll(inputClassName).forEach(elt => elt.value = "")
        let res = []
        await fetch(url)
        .then(Response => res = Response)
        .catch(e => alert(e))
        alert("Article added")
        return res
    }
}

// ========== A === R === T === I === C === L === E ==========

// ======================= Add Article =======================
const formCreateArticle = document.querySelector(".addArticle")

async function addArticle() {
    // Add an Article to article base
    let valuesArr = getFormValues(formCreateArticle, ".addArticleInput")
    let [name, id_size, id_subcategory, id_gender, id_brand, price, description] = [...valuesArr]
    executePhp(formCreateArticle, 
        ".addArticleInput", 
        [name, id_size, id_subcategory, id_gender, id_brand, price, description], 
        `./services/sql/Article.crud.php?function=create&name=${name}&id_size=${id_size}&id_subcategory=${id_subcategory}&id_gender=${id_gender}&id_brand=${id_brand}&price=${price}&description=${description}`
    )
}

formCreateArticle.querySelector("input[type=submit]").addEventListener("click", addArticle)


// ======================= Read Article =======================
const formReadArticle = document.querySelector(".readArticle")

async function readArticle() {
    // Read an Article to article base

    let valuesArr = getFormValues(formReadArticle, ".readArticleInput")
    let [id] = [...valuesArr]
    executePhp(formReadArticle, 
        ".readArticleInput", 
        [id] ,
        `./services/sql/Article.crud.php?function=read&id=${id}`
    )
}

formReadArticle.querySelector("input[type=submit]").addEventListener("click", () => {
    let res = readArticle()
    console.log(res)
})


// ======================= Update Article Data =======================
const formUpdateArticle = document.querySelector(".updateArticle")

async function updateArticle() {
    // Update an Article to article base

    let valuesArr = getFormValues(formUpdateArticle, ".updateArticleInput")
    let [id, name, id_size, id_subcategory, id_gender, id_brand, price, description] = [...valuesArr]
    executePhp(formUpdateArticle, 
        ".updateArticleInput", 
        [id, name, id_size, id_subcategory, id_gender, id_brand, price, description] ,
        `./services/sql/Article.crud.php?function=update&id=${id}&name=${name}&id_size=${id_size}&id_subcategory=${id_subcategory}&id_gender=${id_gender}&id_brand=${id_brand}&price=${price}&description=${description}`
    )
}

formUpdateArticle.querySelector("input[type=submit]").addEventListener("click", updateArticle)


// ======================= Delete Article =======================
const formDeleteArticle = document.querySelector(".deleteArticle")

async function deleteArticle() {
    // Delete an Article to article base

    let valuesArr = getFormValues(formDeleteArticle, ".deleteArticleInput")
    let [id] = [...valuesArr]
    executePhp(formUpdateArticle, 
        ".updateArticleInput", 
        [id], 
        `./services/sql/Article.crud.php?function=delete&id=${id}`
    )
}

formDeleteArticle.querySelector("input[type=submit]").addEventListener("click", deleteArticle)


// ======== S = U = B = C = A = T = E = G = O = R = Y ========

// ======================= Add Subcategory =======================
const formCreateSubcategory = document.querySelector(".addSubcategory")

async function addSubcategory() {
    // Add a Subcategory to Subcategory base
    let valuesArr = getFormValues(formCreateSubcategory, ".addSubcategoryInput")
    let [name, id_size, id_category] = [...valuesArr]
    executePhp(formCreateSubcategory, 
        ".addSubcategoryInput", 
        [name, id_size, id_category], 
        `./services/sql/Subcategory.crud.php?function=create&name=${name}&id_size=${id_size}&id_category=${id_category}`
    )
}

formCreateSubcategory.querySelector("input[type=submit]").addEventListener("click", addSubcategory)


// ======================= Read Subcategory =======================
const formReadSubcategory = document.querySelector(".readSubcategory")

async function readSubcategory() {
    // Read a Subcategory to Subcategory base

    let valuesArr = getFormValues(formReadSubcategory, ".readSubcategoryInput")
    let [id] = [...valuesArr]
    executePhp(formReadSubcategory, 
        ".readSubcategoryInput", 
        [id] ,
        `./services/sql/Subcategory.crud.php?function=read&id=${id}`
    )
}

formReadSubcategory.querySelector("input[type=submit]").addEventListener("click", () => {
    let res = readSubcategory()
    console.log(res)
})


// ======================= Update Subcategory Data =======================
const formUpdateSubcategory = document.querySelector(".updateSubcategory")

async function updateSubcategory() {
    // Update a Subcategory to Subcategory base

    let valuesArr = getFormValues(formUpdateSubcategory, ".updateSubcategoryInput")
    let [id, name, id_size, id_category] = [...valuesArr]
    executePhp(formUpdateSubcategory, 
        ".updateSubcategoryInput", 
        [id, name, id_size, id_category] ,
        `./services/sql/Subcategory.crud.php?function=update&id=${id}&name=${name}&id_category=${id_category}`
    )
}

formUpdateSubcategory.querySelector("input[type=submit]").addEventListener("click", updateSubcategory)


// ======================= Delete Subcategory =======================
const formDeleteSubcategory = document.querySelector(".deleteSubcategory")

async function deleteSubcategory() {
    // Delete a Subcategory to Subcategory base

    let valuesArr = getFormValues(formDeleteSubcategory, ".deleteSubcategoryInput")
    let [id] = [...valuesArr]
    executePhp(formUpdateSubcategory, 
        ".updateSubcategoryInput", 
        [id], 
        `./services/sql/Subcategory.crud.php?function=delete&id=${id}`
    )
}

formDeleteSubcategory.querySelector("input[type=submit]").addEventListener("click", deleteSubcategory)
