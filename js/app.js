let currentProduct = "";
let currentPrice = 0;
let currentUnit = "";
async function loadProducts(category) {

    const response =
        await fetch("../data/products.json");

    const data =
        await response.json();

    const products =
        data[category];

    const container =
        document.getElementById(
            "products-container"
        );

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
        
        <div class="product-card">

            <img src="${product.image}"
                 alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-price">
                    ₹${product.price} / ${product.unit}
                </p>

                <button
                    class="order-btn"
                    onclick="openModal(
                        '${product.name}',
                        ${product.price},
                        '${product.unit}'
                    )"
                > Order Now
                </button>

            </div>

        </div>
        `;

    });

}
function openModal(name, price, unit){

    currentProduct = name;
    currentPrice = price;
    currentUnit = unit;

    document.getElementById(
        "modalProductName"
    ).innerText = name;

    const quantityInput =
        document.getElementById(
            "quantityInput"
        );

    const quantityLabel =
        document.getElementById(
            "quantityLabel"
        );

    if(unit === "piece"){

        quantityLabel.innerText =
            "Number of Pieces";

        quantityInput.min = 1;
        quantityInput.step = 1;
        quantityInput.value = 1;

    }
    else{

        quantityLabel.innerText =
            "Quantity (Kg)";

        quantityInput.min = 0.25;
        quantityInput.step = 0.25;
        quantityInput.value = 1;

    }

    updatePrice();

    document.getElementById(
        "orderModal"
    ).style.display = "flex";
}

function closeModal(){

    document.getElementById(
        "orderModal"
    ).style.display = "none";
}

function updatePrice(){

    const quantity =
        parseFloat(
            document.getElementById(
                "quantityInput"
            ).value
        );

    const totalPrice =
        Math.round(
            currentPrice * quantity
        );

    document.getElementById(
        "calculatedPrice"
    ).innerText =
        `Price: ₹${totalPrice}`;
}

document.addEventListener(
    "input",
    function(e){

        if(
            e.target.id ===
            "quantityInput"
        ){
            updatePrice();
        }

    }
);

function sendWhatsAppOrder(){
    const name =
        document.getElementById(
            "customerName"
        ).value;

    const phone =
        document.getElementById(
            "customerPhone"
        ).value;

    const address =
        document.getElementById(
            "customerAddress"
        ).value;

    const pincode =
        document.getElementById(
            "customerPincode"
        ).value;

    const quantity =
        document.getElementById(
            "quantityInput"
        ).value;

    const price =
        document.getElementById(
            "calculatedPrice"
        ).innerText;

    if(!name || !phone || !address || !pincode){
        alert(
            "Please fill all details."
        );
        return;
    }
    const message =

`Hello JD Foods,

I would like to place an order.

Product: ${currentProduct}

Quantity: ${quantity}

${price}

Customer Name: ${name}

Phone: ${phone}

Address: ${address}

Pincode: ${pincode}
`;

    const whatsappURL =
`https://wa.me/918500784149?text=${encodeURIComponent(message)}`;

    window.open(
        whatsappURL,
        "_blank"
    );
}