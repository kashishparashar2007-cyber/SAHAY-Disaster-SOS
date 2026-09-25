function sendSOS() {
    alert(
        "🚨 SOS Request Sent!\n\n" +
        "Your emergency request has been registered.\n" +
        "Request ID: SOS-" + Math.floor(Math.random() * 90000 + 10000)
    );
}


function selectHelp(type) {
    document.getElementById("helpType").value = type;

    document.querySelector(".request-section").scrollIntoView({
        behavior: "smooth"
    });
}


function submitRequest(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("helpType").value;

    const requestId =
        "REQ-" + Math.floor(Math.random() * 90000 + 10000);

    alert(
        "✅ Help Request Submitted!\n\n" +
        "Name: " + name + "\n" +
        "Help Type: " + type + "\n" +
        "Request ID: " + requestId
    );

    event.target.reset();
}
