
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
        alert("Executed")
        let res = {}
        res = await fetch(url)
        .then(response => response.json())
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
    let res = executePhp(formCreateArticle, 
        ".addArticleInput", 
        [name, id_size, id_subcategory, id_gender, id_brand, price, description], 
        `./services/sql/Article.crud.php?function=create&name=${name}&id_size=${id_size}&id_subcategory=${id_subcategory}&id_gender=${id_gender}&id_brand=${id_brand}&price=${price}&description=${description}`
    )
    return res
}

formCreateArticle.querySelector("input[type=submit]").addEventListener("click", addArticle)


// ======================= Read Article =======================
const formReadArticle = document.querySelector(".readArticle")

async function readArticle() {
    // Read an Article to article base

    let valuesArr = getFormValues(formReadArticle, ".readArticleInput")
    let [id] = [...valuesArr]
    let res = executePhp(formReadArticle, 
        ".readArticleInput", 
        [id] ,
        `./services/sql/Article.crud.php?function=read&id=${id}`
    )
    return res
}

formReadArticle.querySelector("input[type=submit]").addEventListener("click", () => {
    console.log(readArticle())
})


// ======================= Update Article Data =======================
const formUpdateArticle = document.querySelector(".updateArticle")

async function updateArticle() {
    // Update an Article to article base

    let valuesArr = getFormValues(formUpdateArticle, ".updateArticleInput")
    let [id, name, id_size, id_subcategory, id_gender, id_brand, price, description] = [...valuesArr]
    let res = executePhp(formUpdateArticle, 
        ".updateArticleInput", 
        [id, name, id_size, id_subcategory, id_gender, id_brand, price, description] ,
        `./services/sql/Article.crud.php?function=update&id=${id}&name=${name}&id_size=${id_size}&id_subcategory=${id_subcategory}&id_gender=${id_gender}&id_brand=${id_brand}&price=${price}&description=${description}`
    )
    return res
}

formUpdateArticle.querySelector("input[type=submit]").addEventListener("click", updateArticle)


// ======================= Delete Article =======================
const formDeleteArticle = document.querySelector(".deleteArticle")

async function deleteArticle() {
    // Delete an Article to article base

    let valuesArr = getFormValues(formDeleteArticle, ".deleteArticleInput")
    let [id] = [...valuesArr]
    let res = executePhp(formUpdateArticle, 
        ".updateArticleInput", 
        [id], 
        `./services/sql/Article.crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteArticle.querySelector("input[type=submit]").addEventListener("click", deleteArticle)


// ======== S = U = B = C = A = T = E = G = O = R = Y ========

// ======================= Add Subcategory =======================
const formCreateSubcategory = document.querySelector(".addSubcategory")

async function addSubcategory() {
    // Add a Subcategory to Subcategory base
    let valuesArr = getFormValues(formCreateSubcategory, ".addSubcategoryInput")
    let [name, id_category] = [...valuesArr]
    let res = executePhp(formCreateSubcategory, 
        ".addSubcategoryInput", 
        [name, id_category], 
        `./services/sql/Subcategory.crud.php?function=create&name=${name}&id_category=${id_category}`
    )
    return res
}

formCreateSubcategory.querySelector("input[type=submit]").addEventListener("click", addSubcategory)


// ======================= Read Subcategory =======================
const formReadSubcategory = document.querySelector(".readSubcategory")

async function readSubcategory() {
    // Read a Subcategory to Subcategory base

    let valuesArr = getFormValues(formReadSubcategory, ".readSubcategoryInput")
    let [id] = [...valuesArr]
    let res = executePhp(formReadSubcategory, 
        ".readSubcategoryInput", 
        [id] ,
        `./services/sql/Subcategory.crud.php?function=read&id=${id}`
    )
    return res
}

formReadSubcategory.querySelector("input[type=submit]").addEventListener("click", () => {
    console.log(readSubcategory())
})


// ======================= Update Subcategory Data =======================
const formUpdateSubcategory = document.querySelector(".updateSubcategory")

async function updateSubcategory() {
    // Update a Subcategory to Subcategory base

    let valuesArr = getFormValues(formUpdateSubcategory, ".updateSubcategoryInput")
    let [id, name, id_category] = [...valuesArr]
    let res = executePhp(formUpdateSubcategory, 
        ".updateSubcategoryInput", 
        [id, name, id_category] ,
        `./services/sql/Subcategory.crud.php?function=update&id=${id}&name=${name}&id_category=${id_category}`
    )
    return res
}

formUpdateSubcategory.querySelector("input[type=submit]").addEventListener("click", updateSubcategory)


// ======================= Delete Subcategory =======================
const formDeleteSubcategory = document.querySelector(".deleteSubcategory")

async function deleteSubcategory() {
    // Delete a Subcategory to Subcategory base

    let valuesArr = getFormValues(formDeleteSubcategory, ".deleteSubcategoryInput")
    let [id] = [...valuesArr]
    let res = executePhp(formUpdateSubcategory, 
        ".updateSubcategoryInput", 
        [id], 
        `./services/sql/Subcategory.crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteSubcategory.querySelector("input[type=submit]").addEventListener("click", deleteSubcategory)
