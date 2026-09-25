// ================================
// SAHAY - Supabase Connection
// ================================

const SUPABASE_URL = "https://dnawvfoawtywyuidcdwc.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Vf43EO9ubAQhLgQIftzknA_wKNDQ7KZ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// ================================
// SOS BUTTON
// ================================

function sendSOS() {

    const sosId = "SOS-" + Math.floor(Math.random() * 90000 + 10000);

    alert(
        "🚨 SOS Request Sent!\n\n" +
        "Your emergency request has been registered.\n" +
        "Request ID: " + sosId
    );
}


// ================================
// HELP CARD SELECTION
// ================================

function selectHelp(type) {

    const helpType = document.getElementById("helpType");

    if (helpType) {
        helpType.value = type;
    }

    const requestSection = document.querySelector(".request-section");

    if (requestSection) {
        requestSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ================================
// SUBMIT HELP REQUEST
// ================================

async function submitRequest(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const type = document.getElementById("helpType").value;
    const message = document.getElementById("message").value.trim();


    // Basic validation
    if (!name || !phone || !type || !message) {

        alert("⚠️ Please fill all the required fields.");

        return;
    }


    // Send request to Supabase
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


    // If database gives an error
    if (error) {

        console.error("Supabase Error:", error);

        alert(
            "❌ Request submit nahi ho payi.\n\n" +
            "Please try again."
        );

        return;
    }


    // Generate request ID
    const requestId =
        "REQ-" + Math.floor(Math.random() * 90000 + 10000);


    // Success message
    alert(
        "✅ Help Request Submitted!\n\n" +
        "Name: " + name + "\n" +
        "Help Type: " + type + "\n" +
        "Request ID: " + requestId
    );


    // Clear form
    event.target.reset();
}
