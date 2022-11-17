function create(tagName, container, text=null, classs=null, id=null) {
	let element = document.createElement(tagName)
	container.appendChild(element)
	if (text)
		element.appendChild(document.createTextNode(text))
	if (classs)
		element.classList.add(classs)
	if (id)
		element.id = id
	return element
}


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
        if(inputClassName){
            form.querySelectorAll(inputClassName).forEach(elt => elt.value = "")
        }
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
        [username, password], 
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
    let [id, Cartname, password] = [...valuesArr]
    let res = executePhp(formUpdateAdmin, 
        ".updateAdminInput", 
        [id, Cartname, password] ,
        `./services/sql/Admin.crud.php?function=update&id=${id}&Cartname=${Cartname}&password=${password}`
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

// ========== ADDRESS ==========

// --------------- Add Address ---------------
const formCreateAddress = document.querySelector(".addAddress")

async function addAddress() {
    // Add an Cart to admin base
    let valuesArr = getFormValues(formCreateAddress, ".addAddressInput")
    let [id_Cart, number, street, city, country] = [...valuesArr]
    let res = executePhp(formCreateAddress, 
        ".addAddressInput", 
        [id_Cart, number, street, city, country], 
        `./services/sql/address_crud.php?function=create&id_Cart=${id_Cart}&number=${number}&street=${street}&city=${city}&country=${country}`
    )
    return res
}

formCreateAddress.querySelector("input[type=submit]").addEventListener("click", addAddress)

// --------------- Update Address ---------------
const formUpdateAddress = document.querySelector(".updateAddress")

async function updateAddress() {
    // Update an Admin to admin base

    let valuesArr = getFormValues(formUpdateAddress, ".updateAddressInput")
    let [id, id_Cart, number, street, city, country] = [...valuesArr]
    let res = executePhp(formUpdateAddress, 
        ".updateAddressInput", 
        [id, id_Cart, number, street, city, country] ,
        `./services/sql/address_crud.php?function=update&id=${id}&id_Cart=${id_Cart}&number=${number}&street=${street}&city=${city}&country=${country}`
    )
    return res
}

formUpdateAddress.querySelector("input[type=submit]").addEventListener("click", updateAddress)

// --------------- Read Admin ---------------
const formReadAddress = document.querySelector(".readAddress")

async function readAddress() {
    // Read an Admin to admin base

    let valuesArr = getFormValues(formReadAddress, ".readAddressInput")
    let [id_Cart] = [...valuesArr]
    let res = executePhp(formReadAddress, 
        ".readAddressInput", 
        [id_Cart] ,
        `./services/sql/address_crud.php?function=read&id_Cart=${id_Cart}`
    )
    return res
}

formReadAddress.querySelector("input[type=submit]").addEventListener("click", () => {
    console.log(readAddress())
})

// --------------- Delete Cart ---------------
const formDeleteAddress = document.querySelector(".deleteAddress")

async function deleteAddress() {
    // Delete an Admin to admin base

    let valuesArr = getFormValues(formDeleteAddress, ".deleteAddressInput")
    let [id] = [...valuesArr]
    let res = executePhp(formDeleteAddress, 
        ".updateAddressInput", 
        [id], 
        `./services/sql/address_crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteAddress.querySelector("input[type=submit]").addEventListener("click", deleteAddress)

// ========== U === S === E === R ==========

// --------------- Add User ---------------
const formCreateUser = document.querySelector(".addUser")

async function addUser() {
    // Add an User to admin base
    let valuesArr = getFormValues(formCreateUser, ".addUserInput")
    let [firstname, lastname, mail, phone_number, password] = [...valuesArr]
    let res = executePhp(formCreateUser, 
        ".addUserInput", 
        [firstname, lastname, mail, phone_number, password], 
        `./services/sql/user_crud.php?function=create&firstname=${firstname}&lastname=${lastname}&mail=${mail}&phone_number=${phone_number}&password=${password}`
    )
    return res
}

formCreateUser.querySelector("input[type=submit]").addEventListener("click", addUser)


// --------------- Read User ---------------
const formReadUser = document.querySelector(".readUser")
const readUserTable = document.querySelector(".readUserTable")

async function readUser() {
    // Read an Admin to admin base
    let headers = ["id", "firstname", "lastname", "mail", "phone_number", "password"]
    
    tr_title = create("tr", readUserTable)
    for(let header of headers){
        create("th", tr_title, header)
    }

    await fetch("./services/sql/user_crud.php?function=read")
        .then(response => response.json())
        .then( function(data){
            if(data.length != 0){
                for(let user of data){
                    tr_user = create("tr", readUserTable)
                    for(let header of headers){
                        create("td", tr_user, user[header])
                    }
                }
            }
            else{
                create("tr", readUserTable, "empty")
            }
        })
}

formReadUser.querySelector("input[type=submit]").addEventListener("click", () => {
    readUser()
})

// --------------- Update User ---------------
const formUpdateUser = document.querySelector(".updateUser")

async function updateUser() {
    let valuesArr = getFormValues(formUpdateUser, ".updateUserInput")
    let [id, firstname, lastname, mail, phone_number, password] = [...valuesArr]
    let res = executePhp(formUpdateUser, 
        ".updateUserInput", 
        [id, firstname, lastname, mail, phone_number, password], 
        `./services/sql/user_crud.php?function=update&id=${id}&firstname=${firstname}&lastname=${lastname}&mail=${mail}&phone_number=${phone_number}&password=${password}`
    )
    return res
}

formUpdateUser.querySelector("input[type=submit]").addEventListener("click", updateUser)

// --------------- Delete User ---------------
const formDeleteUser = document.querySelector(".deleteUser")

async function deleteUser() {
    // Delete an Admin to admin base

    let valuesArr = getFormValues(formDeleteUser, ".deleteUserInput")
    let [id] = [...valuesArr]
    let res = executePhp(formDeleteUser, 
        ".updateUserInput", 
        [id], 
        `./services/sql/user_crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteUser.querySelector("input[type=submit]").addEventListener("click", deleteUser)


// ========== C === A === R === T ==========

// --------------- Add Cart ---------------
const formCreateCart = document.querySelector(".addCart")

async function addCart() {
    // Add an Cart to admin base
    let valuesArr = getFormValues(formCreateCart, ".addCartInput")
    let [id_user] = [...valuesArr]
    let res = executePhp(formCreateCart, 
        ".addCartInput", 
        [id_user], 
        `./services/sql/cart_crud.php?function=create&id_user=${id_user}`
    )
    return res
}

formCreateCart.querySelector("input[type=submit]").addEventListener("click", addCart)


// --------------- Read Cart ---------------
const formReadCart = document.querySelector(".readCart")
const readCartTable = document.querySelector(".readCartTable")

async function readCart() {
    // Read an Admin to admin base
    let headers = ["id", "id_user"]
    
    tr_title = create("tr", readCartTable)
    for(let header of headers){
        create("th", tr_title, header)
    }

    await fetch("./services/sql/Cart_crud.php?function=read")
        .then(response => response.json())
        .then( function(data){
            if(data.length != 0){
                console.log(data)
                for(let Cart of data){
                    tr_Cart = create("tr", readCartTable)
                    for(let header of headers){
                        create("td", tr_Cart, Cart[header])
                    }
                }
            }
            else{
                create("tr", readCartTable, "empty")
            }
        })
}

formReadCart.querySelector("input[type=submit]").addEventListener("click", () => {
    readCart()
})

// --------------- Update Cart ---------------
const formUpdateCart = document.querySelector(".updateCart")

async function updateCart() {
    let valuesArr = getFormValues(formUpdateCart, ".updateCartInput")
    let [id, id_user] = [...valuesArr]
    let res = executePhp(formUpdateCart, 
        ".updateCartInput", 
        [id, id_user], 
        `./services/sql/Cart_crud.php?function=update&id=${id}&id_user=${id_user}`
    )
    return res
}

formUpdateCart.querySelector("input[type=submit]").addEventListener("click", updateCart)

// --------------- Delete Cart ---------------
const formDeleteCart = document.querySelector(".deleteCart")

async function deleteCart() {
    // Delete an Admin to admin base

    let valuesArr = getFormValues(formDeleteCart, ".deleteCartInput")
    let [id] = [...valuesArr]
    let res = executePhp(formDeleteCart, 
        ".updateCartInput", 
        [id], 
        `./services/sql/Cart_crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteCart.querySelector("input[type=submit]").addEventListener("click", deleteCart)

// ========== C === A === R === T === I=== T=== E=== M ==========

// --------------- Add CartItem ---------------
const formCreateCartItem = document.querySelector(".addCartItem")

async function addCartItem() {
    // Add an CartItem to admin base
    let valuesArr = getFormValues(formCreateCartItem, ".addCartItemInput")
    let [id_cart, id_article, quantity] = [...valuesArr]
    let res = executePhp(formCreateCartItem, 
        ".addCartItemInput", 
        [id_cart, id_article, quantity], 
        `./services/sql/CartItem_crud.php?function=create&id_cart=${id_cart}&id_article=${id_article}&quantity=${quantity}`
    )
    return res
}

formCreateCartItem.querySelector("input[type=submit]").addEventListener("click", addCartItem)


// --------------- Read CartItem ---------------
const formReadCartItem = document.querySelector(".readCartItem")
const readCartItemTable = document.querySelector(".readCartItemTable")

async function readCartItem() {
    // Read an Admin to admin base
    let headers = ["id", "id_cart", "id_article", "quantity"]
    
    tr_title = create("tr", readCartItemTable)
    for(let header of headers){
        create("th", tr_title, header)
    }

    await fetch("./services/sql/CartItem_crud.php?function=read")
        .then(response => response.json())
        .then( function(data){
            if(data.length != 0){
                console.log(data)
                for(let CartItem of data){
                    tr_CartItem = create("tr", readCartItemTable)
                    for(let header of headers){
                        create("td", tr_CartItem, CartItem[header])
                    }
                }
            }
            else{
                create("tr", readCartItemTable, "empty")
            }
        })
}

formReadCartItem.querySelector("input[type=submit]").addEventListener("click", () => {
    readCartItem()
})

// --------------- Update CartItem ---------------
const formUpdateCartItem = document.querySelector(".updateCartItem")

async function updateCartItem() {
    let valuesArr = getFormValues(formUpdateCartItem, ".updateCartItemInput")
    let [id, id_cart, id_article, quantity] = [...valuesArr]
    let res = executePhp(formUpdateCartItem, 
        ".updateCartItemInput", 
        [id, id_cart, id_article, quantity], 
        `./services/sql/cartitem_crud.php?function=update&id=${id}&id_cart=${id_cart}&id_article=${id_article}&quantity=${quantity}`
    )
    return res
}

formUpdateCartItem.querySelector("input[type=submit]").addEventListener("click", updateCartItem)

// --------------- Delete CartItem ---------------
const formDeleteCartItem = document.querySelector(".deleteCartItem")

async function deleteCartItem() {
    // Delete an Admin to admin base

    let valuesArr = getFormValues(formDeleteCartItem, ".deleteCartItemInput")
    let [id] = [...valuesArr]
    let res = executePhp(formDeleteCartItem, 
        ".updateCartItemInput", 
        [id], 
        `./services/sql/CartItem_crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteCartItem.querySelector("input[type=submit]").addEventListener("click", deleteCartItem)


// ========== O === R === D === E === R ==========

// --------------- Add Order ---------------
const formCreateOrder = document.querySelector(".addOrder")

async function addOrder() {
    // Add an Order to admin base
    let valuesArr = getFormValues(formCreateOrder, ".addOrderInput")
    let [id_user, id_cart, number, street, city, country, id_status] = [...valuesArr]
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(date)
    let res = executePhp(formCreateOrder, 
        ".addOrderInput", 
        [id_user, id_cart, number, street, city, country, id_status], 
        `./services/sql/Order_crud.php?function=create&id_user=${id_user}&id_cart=${id_cart}&number=${number}&street=${street}&city=${city}&country=${country}&id_status=${id_status}&date=${date}`
    )
    return res
}

formCreateOrder.querySelector("input[type=submit]").addEventListener("click", addOrder)


// --------------- Read Order ---------------
const formReadOrder = document.querySelector(".readOrder")
const readOrderTable = document.querySelector(".readOrderTable")

async function readOrder() {
    // Read an Admin to admin base
    let headers = ["id", "id_user", "id_cart", "number", "street", "city", "country", "id_status", "date"]
    
    tr_title = create("tr", readOrderTable)
    for(let header of headers){
        create("th", tr_title, header)
    }

    await fetch("./services/sql/Order_crud.php?function=read")
        .then(response => response.json())
        .then( function(data){
            if(data.length != 0){
                console.log(data)
                for(let Order of data){
                    tr_Order = create("tr", readOrderTable)
                    for(let header of headers){
                        create("td", tr_Order, Order[header])
                    }
                }
            }
            else{
                create("tr", readOrderTable, "empty")
            }
        })
}

formReadOrder.querySelector("input[type=submit]").addEventListener("click", () => {
    readOrder()
})

// --------------- Update Order ---------------
const formUpdateOrder = document.querySelector(".updateOrder")

async function updateOrder() {
    let valuesArr = getFormValues(formUpdateOrder, ".updateOrderInput")
    let [id, id_user, id_cart, number, street, city, country, id_status] = [...valuesArr]
    let res = executePhp(formUpdateOrder, 
        ".updateOrderInput", 
        [id, id_user, id_cart, number, street, city, country, id_status], 
        `./services/sql/Order_crud.php?function=update&id=${id}&id_user=${id_user}&id_cart=${id_cart}&number=${number}&street=${street}&city=${city}&country=${country}&id_status=${id_status}`
    )
    return res
}

formUpdateOrder.querySelector("input[type=submit]").addEventListener("click", updateOrder)

// --------------- Delete Order ---------------
const formDeleteOrder = document.querySelector(".deleteOrder")

async function deleteOrder() {
    // Delete an Admin to admin base

    let valuesArr = getFormValues(formDeleteOrder, ".deleteOrderInput")
    let [id] = [...valuesArr]
    let res = executePhp(formDeleteOrder, 
        ".updateOrderInput", 
        [id], 
        `./services/sql/Order_crud.php?function=delete&id=${id}`
    )
    return res
}

formDeleteOrder.querySelector("input[type=submit]").addEventListener("click", deleteOrder)

