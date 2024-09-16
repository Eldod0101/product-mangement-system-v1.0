// Programmed by - Eldod - 2024
let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let deleteAll = document.getElementById("deleteAll");
let mood = "create";
let updateIndex;
let searchMood = "title";

//Get Total
total.innerHTML = "0 $";

function getTotal() {
    if (price.value != "") {
        let totalPrice = (+price.value + +tax.value + +ads.value) - +discount.value;
        total.style.background = "#040";
        total.innerHTML = totalPrice + " $";
        if (totalPrice.toString().length > 7) {
            total.style.marginLeft = "1.5%";
        }
        if (totalPrice.toString().length > 8) {
            total.style.marginLeft = "1%";
        }
    } else {
        total.innerHTML = "0 $";
        total.style.background = "#a00d02";
    }
}
//create product

let dataProduct;

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}

clearData = () => {
    title.value = "";
    price.value = "";
    tax.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "0 $";
    count.value = "";
    category.value = "";
}
create.onclick = function() {
    let newproduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != "" && price.value != "" && category.value != "" && count.value <= 100) {
        if (mood === "create") {
            if (newproduct.count > 1) {
                for (let i = 0; i < newproduct.count; i++) {
                    dataProduct.push(newproduct);
                }
            } else {

                dataProduct.push(newproduct);
            }
            clearData();
        } else {
            dataProduct[updateIndex] = newproduct;
            mood = "create";
            create.innerHTML = "create";
            count.style.display = "block";
            clearData();
        }
    }
    // else if (count.value > 100) {
    //     alert("The count must not be greater than 100!!")
    // } else if (title.value == "") {
    //     alert("The title must not be empty!!")
    // } else if (price.value == "") {
    //     alert("The price must not be empty!!")
    // } else if (category.value == "") {
    //     alert("The category must not be empty!!")
    // }

    localStorage.setItem("product", JSON.stringify(dataProduct));
    //clear data

    showData()

}

//show data
function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>    
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tax}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td>${dataProduct[i].count}</td>
            <td>
                <button onclick="updateData(${i})" id="update">update</button>
            </td>
            <td>
                <button onclick="deleteData(${i})" id="delete">delete</button>
            </td>
        </tr>
        `
    }
    tbody.innerHTML = table;
    if (dataProduct.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAllProduct()">delete All (${dataProduct.length})</button>`
    } else {
        deleteAll.innerHTML = ``;
    }
}
showData()


//Delete product
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}


//Delete All
function deleteAllProduct() {
    //windows alert text be like *****
    // password = window.prompt("Enter your password");
    // if (password == "eldod") {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
    // } else {
    //     window.alert("wrong password");
    // }
}


//Update
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    tax.value = dataProduct[i].tax;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    category.value = dataProduct[i].category;
    count.style.display = "none";
    create.innerHTML = "update";
    updateIndex = i;
    mood = "update";
    scroll({
        top: 0,
        behavior: "smooth",
    });
}


function getSearchMood(id) {

    if (id == "searchTitle") {
        searchMood = "title";
        console.log(searchMood)
        search.placeholder = "search by title";
    } else {
        searchMood = "category";
        search.placeholder = "search by category";

    }
    search.focus();
}


function searchData(value) {
    console.log(value)
    let table = ``;
    value = value.toLowerCase(); // Ensure the search input is in lowercase
    if (searchMood == "title") {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i] && dataProduct[i].title && dataProduct[i].title.includes(value)) {
                console.log(dataProduct[i].title)
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>    
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].tax}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td>
                        <button onclick="updateData(${i})" id="update">update</button>
                    </td>
                    <td>
                        <button onclick="deleteData(${i})" id="delete">delete</button>
                    </td>
                </tr>
                `;
            }
        }
    } else if (searchMood == "category") {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i] && dataProduct[i].category && dataProduct[i].category.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>    
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].tax}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].count}</td>
                    <td>
                        <button onclick="updateData(${i})" id="update">update</button>
                    </td>
                    <td>
                        <button onclick="deleteData(${i})" id="delete">delete</button>
                    </td>
                </tr>
                `;
            }
        }
    }

    if (table === ``) {
        tbody.innerHTML = `<tr><td colspan="10">No products found</td></tr>`;
    } else {
        tbody.innerHTML = table;
    }
}