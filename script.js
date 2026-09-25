// ==========================================
// SAHAY - Supabase Connection
// ==========================================

const SUPABASE_URL =
    "https://dnawvfoawtwyyuidcdwc.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Vf43EO9ubAQhLgQIftzknA_wKNDQ7KZ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// ==========================================
// SOS BUTTON
// ==========================================

async function sendSOS() {

    const name = prompt("Enter your name:");

    if (!name) {
        alert("⚠️ Please enter your name.");
        return;
    }

    const phone = prompt("Enter your phone number:");

    if (!phone) {
        alert("⚠️ Please enter your phone number.");
        return;
    }

    const message = prompt(
        "What emergency help do you need?"
    );

    if (!message) {
        alert("⚠️ Please describe your emergency.");
        return;
    }


    // Save SOS request to Supabase
    const { error } = await supabaseClient
        .from("sos_requests")
        .insert([
            {
                name: name,
                phone: phone,
                message: message
            }
        ]);


    // Show database error
    if (error) {

        console.error("SOS ERROR:", error);

        alert(
            "❌ SOS submit nahi ho paya.\n\n" +
            "Message: " + error.message + "\n\n" +
            "Code: " + (error.code || "N/A")
        );

        return;
    }


    // Generate SOS ID
    const sosId =
        "SOS-" + Math.floor(Math.random() * 90000 + 10000);


    // Success message
    alert(
        "🚨 SOS Request Sent!\n\n" +
        "Your emergency request has been registered.\n" +
        "Request ID: " + sosId
    );
}


// ==========================================
// HELP CARD SELECTION
// ==========================================

function selectHelp(type) {

    const helpType =
        document.getElementById("helpType");

    if (helpType) {
        helpType.value = type;
    }

    const requestSection =
        document.querySelector(".request-section");

    if (requestSection) {
        requestSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ==========================================
// SUBMIT HELP REQUEST
// ==========================================

async function submitRequest(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const type =
        document.getElementById("helpType").value;

    const message =
        document.getElementById("message").value.trim();


    // Check required fields
    if (!name || !phone || !type || !message) {

        alert(
            "⚠️ Please fill all the required fields."
        );

        return;
    }


    // Save help request to Supabase
    const { error } = await supabaseClient
        .from("help_requests")
        .insert([
            {
                name: name,
                phone: phone,
                help_type: type,
                message: message
            }
        ]);


    // Show database error
    if (error) {

        console.error("SUPABASE ERROR:", error);

        alert(
            "❌ SUPABASE ERROR\n\n" +
            "Message: " + error.message + "\n\n" +
            "Code: " + (error.code || "N/A")
        );

        return;
    }


    // Generate request ID
    const requestId =
        "REQ-" + Math.floor(Math.random() * 90000 + 10000);


    // Success
    alert(
        "✅ Help Request Submitted!\n\n" +
        "Name: " + name + "\n" +
        "Help Type: " + type + "\n" +
        "Request ID: " + requestId
    );


    // Reset form
    event.target.reset();
}

        


    

    
                




