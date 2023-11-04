

let ipAdress = document.getElementById("ipAdress");
let header = document.getElementById("header");
let map = document.getElementById("map-container");
let infoContainer = document.getElementById("info-container");
let cardContainer = document.getElementById("card-container");
let searchInput = document.getElementById("searchInput");

let postOfcData = [];

async function fetchedIP() {
    try {
        // Fetch the IP address using ipify.org
        const response = await fetch(`https://api.ipify.org/?format=json`);
        const data = await response.json();
        console.log(data);

        // Fetch IP information using ipapi.co
        const ipInfoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
        const ipInfoData = await ipInfoResponse.json();
        console.log(ipInfoData);

        header.innerHTML = `
            <p>IP Address : ${ipInfoData.ip}</p>
            <div class="keys-container">
                <div class="keys">
                    <p>Latitude: ${ipInfoData.latitude}</p>
                    <p>Longitude: ${ipInfoData.longitude}</p>
                </div>
                <div class="keys">
                    <p>City: ${ipInfoData.city}</p>
                    <p>Region: ${ipInfoData.region}</p>
                </div>
                <div class="keys">
                    <p>Organisation: ${ipInfoData.org}</p>
                    <p>Host Name: ${ipInfoData.network}</p>
                </div>
            </div>`;

        map.innerHTML = `
            <h2>Your Current Location</h2>
            <iframe width="700" height="500" frameborder="0" style="border:0"
                src="https://www.google.com/maps?q=${ipInfoData.latitude},${ipInfoData.longitude}&output=embed">
            </iframe>
        `;

        const timeZone = ipInfoData.timezone;
        const currentTime = new Date().toLocaleString('en-US', { timeZone });

        const additionalInfoHTML = `
            <div class="Information">
                <h2>More Information About You</h2>
                <div id="info-container">
                    <p>Time Zone: <span id="time-zone"> ${timeZone}</span></p>
                    <p>Date And Time: <span id="date-time"> ${currentTime}</span></p>
                    <p>Pincode: <span id="pincode"> ${ipInfoData.postal}</span></p>
                </div>
            </div>`;
        infoContainer.innerHTML = additionalInfoHTML;

        await fetchPostalApi(ipInfoData.postal);
    } catch (error) {
        console.log(error);
    }
}

async function fetchPostalApi(pincode) {
    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        message = data[0].Message;
        postOfcData = data[0].PostOffice;
        renderPostalApiData(postOfcData);
    } catch (e) {
        console.log(e);
    }
}

function renderPostalApiData(data) {
    cardContainer.innerHTML = "";

    data.forEach((ele) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h4>Name: <span>${ele.Name}</span></h4>
            <h4>Branch Type: <span>${ele.BranchType}</span></h4>
            <h4>Delivery Status: <span>${ele.DeliveryStatus}</span></h4>
            <h4>District: <span>${ele.District}</span></h4>
            <h4>Division: <span>${ele.Division}</span></h4>
        `;
        cardContainer.appendChild(div);
    });
}

searchInput.addEventListener("keyup", (event) => {
    const searchText = event.target.value.toLowerCase();
    filterPostOfc(searchText, postOfcData);
});

function filterPostOfc(searchText, postOfcData) {
    const filterData = postOfcData.filter((ele) => {
        return ele.Name.toLowerCase().includes(searchText);
    });

    renderPostalApiData(filterData);
}

window.addEventListener("load", fetchedIP);
