// /* Add "https://api.ipify.org?format=json" statement
// 			this will communicate with the ipify servers in
// 			order to retrieve the IP address $.getJSON will
// 			load JSON-encoded data from the server using a
// 			GET HTTP request */
// // Function to get the user's IP address

// function getIpAddress() {
//     $.getJSON("https://api.ipify.org?format=json", function(data) {
//         $("#ip-address").html(data.ip);
//     });
// }

// // Function to get IP information from the API
// // function getIpInformation(ip) {
// //     $.getJSON(`https://ipapi.co/${ip}/json/`, function(data) {
// //         // $("#ip-info").html(JSON.stringify(data, null, 2));
// //         let dataImformation = JSON.stringify(data,null,2);
// //         console.log(dataImformation);
  
// //     let map = document.getElementById("ip-info");

// //     map.innerHTML  = `<iframe width="600" height="450" frameborder="0" style="border:0"
// //     src="https://www.google.com/maps?q=${dataImformation.latitude},${dataImformation.longitude}&output=embed></iframe>
// //     `

// //     });
// // }




//  Function to get IP information from the API
// function getIpInformation(ip) {
//     $.getJSON(`https://ipapi.co/${ip}/json/`, function(data) {
//         // Check if the API response contains latitude and longitude
//         if (data.latitude && data.longitude) {
//             let map = document.getElementById("ip-info");

//             map.innerHTML = `
//                 <iframe width="600" height="450" frameborder="0" style="border:0"
//                 src="https://www.google.com/maps?q=${data.latitude},${data.longitude}&output=embed"></iframe>
//             `;
//         } else {
//             console.log("Latitude and longitude not found in the API response.");
//         }
//     });
// }











// // Get the user's IP address on page load
// getIpAddress();

// // Add a click event handler to the button
// $("#get-ip-info-button").on("click", function() {
//     const ipAddress = $("#ip-address").text();
//     getIpInformation(ipAddress);
// });



const  IP =document.getElementById("ip-address");
const Btn =document.getElementById("get-started");




//fetch ip address
async function fetchIP(){
    try{
        const response= await fetch(`https://api.ipify.org/?format=json`)
        const data=await response.json();
        // console.log(data);
        IP.innerText=data.ip;
        // storeIp(data);
    }
    catch(error){
        console.log(error);
    }

}

// fetchIP();


Btn.addEventListener("click", async()=>{
   
     window.location.href="./post.html"
    
})



// function storeIp(data){
//     localStorage.setItem("ip", data.ip);

// }

// function sucess(position){
//     console.log(position);
//     localStorage.setItem("lat", position.coords.latitude)
//     localStorage.setItem("long", position.coords.longitude)
//     window.location.href="./main.html"
   
// }

// function faild(){
//     alert("give your loacation access")
// }