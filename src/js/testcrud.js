
const getFormValues = (form, inputClassName) => { 

//  Return an Array with all values of form
//      * form <object> : the container of all inputs of the form
//      * inputClassName <string> : className of all inputs of the form

    let valuesArr = []
    let inputList = form.querySelectorAll(inputClassName)
    inputList.forEach(elt => valuesArr.push(elt.value))
    return valuesArr
}

async function executePhp (form, inputClassName, variables, url) {

//  Fetch the response of php file and return it in json format 
//      * form <object> : the container of all inputs of the form
//      * inputClassName <string> : className of all inputs of the form
//      * variables <array> : Array containing variables names of crud function
//      * url <string> : The url of file .php with a "function" setting and all variables in $_GET
//          /!\ "function" setting must be "create" / "read" / "update" / "delete"
//          -- url exemple : "./services/sql/Subcategory.crud.php?function=read&id=1`

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

// --------------- Add Article ---------------
const formCreateArticle = document.querySelector(".addArticle")

async function addArticle() {
    // Add an Article to article base
    let valuesArr = getFormValues(formCreateArticle, ".addArticleInput")
    let [name, id_size, id_subcategory, id_gender, id_brand, price, description, image] = [...valuesArr]
    let res = executePhp(formCreateArticle, 
        ".addArticleInput", 
        [name, id_size, id_subcategory, id_gender, id_brand, price, description, image], 
        `./services/sql/Article.crud.php?function=create&name=${name}&id_size=${id_size}&id_subcategory=${id_subcategory}&id_gender=${id_gender}&id_brand=${id_brand}&price=${price}&description=${description}&image=${image}`
    )
    return res
}

formCreateArticle.querySelector("input[type=submit]").addEventListener("click", addArticle)


// --------------- Read Article ---------------
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


// --------------- Update Article Data ---------------
const formUpdateArticle = document.querySelector(".updateArticle")

async function updateArticle() {
    // Update an Article to article base

    let valuesArr = getFormValues(formUpdateArticle, ".updateArticleInput")
    let [id, name, id_size, id_subcategory, id_gender, id_brand, price, description, image] = [...valuesArr]
    let res = executePhp(formUpdateArticle, 
        ".updateArticleInput", 
        [id, name, id_size, id_subcategory, id_gender, id_brand, price, description, image] ,
        `./services/sql/Article.crud.php?function=update&id=${id}&name=${name}&id_size=${id_size}&id_subcategory=${id_subcategory}&id_gender=${id_gender}&id_brand=${id_brand}&price=${price}&description=${description}&image=${image}`
    )
    return res
}

formUpdateArticle.querySelector("input[type=submit]").addEventListener("click", updateArticle)


// --------------- Delete Article ---------------
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

// --------------- Add Subcategory ---------------
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


// --------------- Read Subcategory ---------------
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


// --------------- Update Subcategory Data ---------------
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


// --------------- Delete Subcategory ---------------
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


// ============ C == A == T == E == G == O == R == Y =============

// --------------- Add Category ---------------
const formCreateCategory = document.querySelector(".addCategory")

async function addCategory() {
    // Add a Category to Category base
    let valuesArr = getFormValues(formCreateCategory, ".addCategoryInput")
    let [name] = [...valuesArr]
    let res = executePhp(formCreateCategory, 
        ".addCategoryInput", 
        [name], 
        `./services/sql/Category.crud.php?function=create&name=${name}`
    )
    return res
}

formCreateCategory.querySelector("input[type=submit]").addEventListener("click", addCategory)


// --------------- Read Category ---------------
const formReadCategory = document.querySelector(".readCategory")

async function readCategory() {
    // Read a Category to Category base

    let valuesArr = getFormValues(formReadCategory, ".readCategoryInput")
    let [id] = [...valuesArr]
    let res = executePhp(formReadCategory, 
        ".readCategoryInput", 
        [id] ,
        `./services/sql/Category.crud.php?function=read&id=${id}`
    )
    return res
}

formReadCategory.querySelector("input[type=submit]").addEventListener("click", () => {
    console.log(readCategory())
})


// --------------- Update Category Data ---------------
const formUpdateCategory = document.querySelector(".updateCategory")

async function updateCategory() {
    // Update a Category to Category base

    let valuesArr = getFormValues(formUpdateCategory, ".updateCategoryInput")
    let [id, name] = [...valuesArr]
    let res = executePhp(formUpdateCategory, 
        ".updateCategoryInput", 
        [id, name] ,
        `./services/sql/Category.crud.php?function=update&id=${id}&name=${name}`
    )
    return res
}

formUpdateCategory.querySelector("input[type=submit]").addEventListener("click", updateCategory)


// --------------- Delete Category ---------------
const formDeleteCategory = document.querySelector(".deleteCategory")

async function deleteCategory() {
    // Delete a Category to Category base

    let valuesArr = getFormValues(formDeleteCategory, ".deleteCategoryInput")
    let [id] = [...valuesArr]
    let res = executePhp(formUpdateCategory, 
        ".updateCategoryInput", 
        [id], 
        `./services/sql/Category.crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteCategory.querySelector("input[type=submit]").addEventListener("click", deleteCategory)





// ========== L === O === G ==========

// --------------- Add Log ---------------
const formCreateLog = document.querySelector(".addLog")

async function addLog() {
    // Add an Log to Log base
    let valuesArr = getFormValues(formCreateLog, ".addLogInput")
    let [id_admin, action] = [...valuesArr]
    let res = executePhp(formCreateLog, 
        ".addLogInput", 
        [id_admin, action], 
        `./services/sql/Log.crud.php?function=create&id_admin=${id_admin}&action=${action}`
    )
    return res
}

formCreateLog.querySelector("input[type=submit]").addEventListener("click", addLog)


// --------------- Read Log ---------------
const formReadLog = document.querySelector(".readLog")

async function readLog() {
    // Read an Log to log base

    let valuesArr = getFormValues(formReadLog, ".readLogInput")
    let [id] = [...valuesArr]
    let res = executePhp(formReadLog, 
        ".readLogInput", 
        [id] ,
        `./services/sql/Log.crud.php?function=read&id=${id}`
    )
    return res
}

formReadLog.querySelector("input[type=submit]").addEventListener("click", () => {
    console.log(readLog())
})

// --------------- Update Log Data ---------------
const formUpdateLog = document.querySelector(".updateLog")

async function updateLog() {
    // Update an Log to log base

    let valuesArr = getFormValues(formUpdateLog, ".updateLogInput")
    let [id, id_admin, action] = [...valuesArr]
    let res = executePhp(formUpdateLog, 
        ".updateLogInput", 
        [id, id_admin, action] ,
        `./services/sql/Log.crud.php?function=update&id=${id}&id_admin=${id_admin}&action=${action}`
    )
    return res
}

formUpdateLog.querySelector("input[type=submit]").addEventListener("click", updateLog)

// --------------- Delete Log ---------------
const formDeleteLog = document.querySelector(".deleteLog")

async function deleteLog() {
    // Delete an Log to log base

    let valuesArr = getFormValues(formDeleteLog, ".deleteLogInput")
    let [id] = [...valuesArr]
    let res = executePhp(formUpdateLog, 
        ".updateLogInput", 
        [id], 
        `./services/sql/Log.crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteLog.querySelector("input[type=submit]").addEventListener("click", deleteLog)


// ========== A === D === M === I === N ==========

// --------------- Add Admin ---------------
const formCreateAdmin = document.querySelector(".addAdmin")

async function addAdmin() {
    // Add an Admin to admin base
    let valuesArr = getFormValues(formCreateAdmin, ".addAdminInput")
    let [username, password] = [...valuesArr]
    let res = executePhp(formCreateAdmin, 
        ".addAdminInput", 
        [id_admin, action], 
        `./services/sql/Admin.crud.php?function=create&username=${username}&password=${password}`
    )
    return res
}

formCreateAdmin.querySelector("input[type=submit]").addEventListener("click", addAdmin)


// --------------- Read Admin ---------------
const formReadAdmin = document.querySelector(".readAdmin")

async function readAdmin() {
    // Read an Admin to admin base

    let valuesArr = getFormValues(formReadAdmin, ".readAdminInput")
    let [id] = [...valuesArr]
    let res = executePhp(formReadAdmin, 
        ".readAdminInput", 
        [id] ,
        `./services/sql/Admin.crud.php?function=read&id=${id}`
    )
    return res
}

formReadAdmin.querySelector("input[type=submit]").addEventListener("click", () => {
    console.log(readAdmin())
})

// --------------- Update Admin Data ---------------
const formUpdateAdmin = document.querySelector(".updateAdmin")

async function updateAdmin() {
    // Update an Admin to admin base

    let valuesArr = getFormValues(formUpdateAdmin, ".updateAdminInput")
    let [id, username, password] = [...valuesArr]
    let res = executePhp(formUpdateAdmin, 
        ".updateAdminInput", 
        [id, username, password] ,
        `./services/sql/Admin.crud.php?function=update&id=${id}&username=${username}&password=${password}`
    )
    return res
}

formUpdateAdmin.querySelector("input[type=submit]").addEventListener("click", updateAdmin)

// --------------- Delete Admin ---------------
const formDeleteAdmin = document.querySelector(".deleteAdmin")

async function deleteAdmin() {
    // Delete an Admin to admin base

    let valuesArr = getFormValues(formDeleteAdmin, ".deleteAdminInput")
    let [id] = [...valuesArr]
    let res = executePhp(formUpdateAdmin, 
        ".updateAdminInput", 
        [id], 
        `./services/sql/Admin.crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteAdmin.querySelector("input[type=submit]").addEventListener("click", deleteAdmin)



