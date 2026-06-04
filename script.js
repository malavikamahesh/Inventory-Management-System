// Load products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

let editIndex = -1;

// DOM Elements
const form = document.getElementById("productForm");
const table = document.getElementById("productTable");
const searchInput = document.getElementById("search");

// Display Products on Page Load
displayProducts();

// =========================
// SAVE PRODUCT
// =========================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const product = {

        name: document.getElementById("name").value.trim(),

        id: document.getElementById("id").value.trim(),

        category: document.getElementById("category").value.trim(),

        quantity: Number(
            document.getElementById("quantity").value
        ),

        price: Number(
            document.getElementById("price").value
        ),

        supplier: document.getElementById("supplier").value.trim()

    };

    // Validation
    if (
        !product.name ||
        !product.id ||
        !product.category ||
        product.quantity < 0 ||
        product.price < 0
    ) {

        alert("Please enter valid product details.");

        return;
    }

    // Edit Product
    if (editIndex >= 0) {

        products[editIndex] = product;

        editIndex = -1;

    }

    // Add Product
    else {

        products.push(product);

    }

    saveToLocalStorage();

    displayProducts();

    form.reset();

});

// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts(filteredProducts = products) {

    table.innerHTML = "";

    if (filteredProducts.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No Products Found
                </td>
            </tr>
        `;

        return;
    }

    filteredProducts.forEach((product, index) => {

        const row = document.createElement("tr");

        if (product.quantity < 10) {

            row.classList.add("low-stock");

        }

        row.innerHTML = `

            <td>${product.name}</td>

            <td>${product.id}</td>

            <td>${product.category}</td>

            <td>${product.quantity}</td>

            <td>₹${product.price}</td>

            <td>${product.supplier || "-"}</td>

            <td>

                <button onclick="editProduct(${index})">
                    Edit
                </button>

                <button onclick="deleteProduct(${index})">
                    Delete
                </button>

            </td>

        `;

        table.appendChild(row);

    });

}

// =========================
// EDIT PRODUCT
// =========================

function editProduct(index) {

    const product = products[index];

    document.getElementById("name").value =
        product.name;

    document.getElementById("id").value =
        product.id;

    document.getElementById("category").value =
        product.category;

    document.getElementById("quantity").value =
        product.quantity;

    document.getElementById("price").value =
        product.price;

    document.getElementById("supplier").value =
        product.supplier;

    editIndex = index;

}

// =========================
// DELETE PRODUCT
// =========================

function deleteProduct(index) {

    const confirmDelete =
        confirm("Delete this product?");

    if (!confirmDelete) return;

    products.splice(index, 1);

    saveToLocalStorage();

    displayProducts();

}

// =========================
// SEARCH
// =========================

searchInput.addEventListener("keyup", function () {

    const keyword =
        this.value.toLowerCase();

    const filteredProducts =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(keyword)

            ||

            product.category
                .toLowerCase()
                .includes(keyword)

        );

    displayProducts(filteredProducts);

});

// =========================
// SORT BY QUANTITY
// =========================

function sortQuantity() {

    products.sort(
        (a, b) => b.quantity - a.quantity
    );

    saveToLocalStorage();

    displayProducts();

}

// =========================
// SORT BY PRICE
// =========================

function sortPrice() {

    products.sort(
        (a, b) => b.price - a.price
    );

    saveToLocalStorage();

    displayProducts();

}

// =========================
// EXPORT CSV
// =========================

function exportCSV() {

    if (products.length === 0) {

        alert("No products available.");

        return;

    }

    let csv =

        "Name,ID,Category,Quantity,Price,Supplier\n";

    products.forEach(product => {

        csv +=

            `${product.name},` +
            `${product.id},` +
            `${product.category},` +
            `${product.quantity},` +
            `${product.price},` +
            `${product.supplier}\n`;

    });

    const blob = new Blob([csv], {

        type: "text/csv"

    });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = "inventory.csv";

    a.click();

    URL.revokeObjectURL(url);

}

// =========================
// CLEAR ALL PRODUCTS
// =========================

function clearAll() {

    const confirmClear =

        confirm(
            "Delete all products?"
        );

    if (!confirmClear) return;

    products = [];

    saveToLocalStorage();

    displayProducts();

}

// =========================
// LOCAL STORAGE
// =========================

function saveToLocalStorage() {

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

}