const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const itemCode = params.get('code');
console.log(itemCode);

function updateItem(item) {
    let stdName = document.getElementById('stdName');
    console.log(item);
    stdName.value = item.itemName;
    let stdAge = document.getElementById('stdAge');
    stdAge.value = item.itemCategory;
    let stdContacts = document.getElementById('stdContacts');
    stdContacts.value = item.itemPrice;
    let stdEmail = document.getElementById('stdEmail');
    stdEmail.value = item.itemExpiryDate;
    let guardianName = document.getElementById("guardianName");
    guardianName.value = item.itemQuantity;
    let guardianAddress = document.getElementById("guardianAddress");
    guardianAddress.value = item.itemCode;
    let itemModel = bootstrap.Modal.getOrCreateInstance("#updateModal");
    itemModel.show();

}

function deleteItem(item) {
    let itemModel = bootstrap.Modal.getOrCreateInstance("#deleteModal");
    itemModel.show();
}

document.getElementById("btnConfirmDelete").addEventListener("click", async function () {
    try {
        let response = await fetch(`http://localhost:8080/item/deleteitem/${itemCode}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Student deleted successfully.");
        window.location.href = "file:///D:/Final-Burger-Shop/assests/html/menu.html";

    } catch (error) {
        console.error("Error deleting student:", error);
    } finally {
        let itemModel = bootstrap.Modal.getOrCreateInstance("#deleteModal");
        itemModel.hide();
    }
});

document.getElementById("btnUpdateStudent").addEventListener("click", async function (event) {
    event.preventDefault();
    let i = document.getElementById('stdName');
    let stdAge = document.getElementById('stdAge');
    let stdContacts = document.getElementById('stdContacts');
    let stdEmail = document.getElementById('stdEmail');
    let guardianName = document.getElementById("guardianName");
    let guardianAddress = document.getElementById("guardianAddress");

    let item = {
        itemName: stdName.value,
        itemCategory: stdAge.value,
        itemPrice: stdContacts.value,
        itemQuantity: stdEmail.value,
        itemExpiryDate: guardianName.value,
        itemCode: guardianAddress.value,

    };

    try {
        let response = await fetch("http://localhost:8080/item/updateitem", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Student updated successfully.");
        window.location.reload();

    } catch (error) {
        console.error("Error updating student:", error);
    }
    finally {
        let modal = new bootstrap.Modal(document.getElementById("updateModal"));
        modal.hide();
    }


});
async function getItemDetails(itemCode) {
    try {
        console.log("10000");
        let response = await fetch(`http://localhost:8080/item/searchitem/${itemCode}`);
        let item = await response.json();
        console.log("10000");
        console.log(item);
        console.log("10000");
        document.getElementById('row').innerHTML = `
        <div class="col-lg-6 col-md-6 d-flex justify-content-center">
                <div class="imgDiv">
                    <img src="${item.itemImage}"
                        alt="" srcset="" class="studentImg img-fluid">
                </div>
            </div>
            <div class="col-lg-6 col-md-6 mt-lg-0 mt-md-0 mt-4 d-flex justify-content-center">
                <div class="detailsDiv">
                    <h3 class="guardianInfo">Item Details</h3>
                    <hr>
                    <div class="detailsRow">
                        <label for="studentName" class="label form-label"><strong>Name : </strong></label>
                        <label for="studentName" class="label form-label"><strong>${item.itemName}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="studentName" class="label form-label"><strong>Category : </strong></label>
                        <label for="studentName" class="label form-label"><strong>${item.itemCategory}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="studentName" class="label form-label"><strong>Price : </strong></label>
                        <label for="studentName" class="label form-label"><strong>${item.itemPrice}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="studentName" class="label form-label"><strong>Quantity : </strong></label>
                        <label for="studentName" class="label form-label"><strong>${item.itemQuantity}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="studentName" class="label form-label"><strong>Expiry Date : </strong></label>
                        <label for="studentName" class="label form-label"><strong>${item.itemExpiryDate}</strong></label>
                    </div>
                    <div class="detailsRow">
                        <label for="studentName" class="label form-label"><strong>Item Code : </strong></label>
                        <label for="studentName" class="label form-label"><strong>${item.itemCode}</strong></label>
                    </div>

                    <div class="buttonRow">
                        <button class="btnClear" id="btnUpdate">Update</button>
                        <button class="btnRegister" id="btnDelete">Delete</button>
                    </div>

                </div>
            </div>`

        document.getElementById('btnUpdate').addEventListener('click', function () {
            console.log(itemCode);
            updateItem(item);
        });
        document.getElementById('btnDelete').addEventListener('click', function () {
            console.log(itemCode);
            deleteItem(item);
        });
    } catch (error) {
        console.log(error);
    }
}

getItemDetails(itemCode);

