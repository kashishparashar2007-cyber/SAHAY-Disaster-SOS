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


    // Send SOS request to Supabase
    const { error } = await supabaseClient
        .from("sos_requests")
        .insert([
            {
                name: name,
                phone: phone,
                message: message
            }
        ]);


    // If error occurs
    if (error) {

        console.error("SOS ERROR:", error);

        alert(
            "❌ SOS submit nahi ho paya.\n\n" +
            "Message: " + error.message + "\n\n" +
            "Code: " + (error.code || "N/A")
        );

        return;
    }


    // Success
    alert(
        "🚨 SOS Request Sent!\n\n" +
        "Your emergency request has been registered successfully.\n\n" +
        "Our response team can now process your request."
    );
}


// ==========================================
// TRACK SOS
// ==========================================

async function trackSOS() {

    const input =
        document.getElementById("sosIdInput");

    const result =
        document.getElementById("sosStatus");

    const enteredId =
        input.value.trim();


    if (!enteredId) {

        alert(
            "⚠️ Please enter your SOS Request ID."
        );

        return;
    }


    // Remove SOS- prefix
    const id =
        enteredId.replace(/^SOS-/i, "");


    const { data, error } = await supabaseClient
        .from("sos_requests")
        .select("id, name, message, status, created_at")
        .eq("id", id)
        .single();


    if (error) {

        console.error(
            "TRACK SOS ERROR:",
            error
        );

        result.innerHTML = `
            <div class="sos-result">

                <p>
                    ❌ SOS Request not found.
                </p>

            </div>
        `;

        return;
    }


    result.innerHTML = `
        <div class="sos-result">

            <h3>🚨 SOS Request Found</h3>

            <p>
                <strong>Request ID:</strong>
                SOS-${data.id}
            </p>

            <p>
                <strong>Name:</strong>
                ${data.name}
            </p>

            <p>
                <strong>Emergency:</strong>
                ${data.message}
            </p>

            <p>
                <strong>Status:</strong>
                ${data.status
                    ? data.status.toUpperCase()
                    : "PENDING"}
            </p>

        </div>
    `;
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
        document.querySelector(
            ".request-section"
        );


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
        document.getElementById("name")
            .value
            .trim();


    const phone =
        document.getElementById("phone")
            .value
            .trim();


    const type =
        document.getElementById("helpType")
            .value;


    const message =
        document.getElementById("message")
            .value
            .trim();


    // Validation
    if (
        !name ||
        !phone ||
        !type ||
        !message
    ) {

        alert(
            "⚠️ Please fill all the required fields."
        );

        return;
    }


    // Insert help request
    const { error } =
        await supabaseClient
            .from("help_requests")
            .insert([
                {
                    name: name,
                    phone: phone,
                    help_type: type,
                    message: message
                }
            ]);


    // Error
    if (error) {

        console.error(
            "SUPABASE ERROR:",
            error
        );

        alert(
            "❌ SUPABASE ERROR\n\n" +
            "Message: " +
            error.message +
            "\n\n" +
            "Code: " +
            (error.code || "N/A")
        );

        return;
    }


    // Temporary request ID
    const requestId =
        "REQ-" +
        Math.floor(
            Math.random() * 90000 + 10000
        );


    alert(
        "✅ Help Request Submitted!\n\n" +
        "Name: " + name + "\n" +
        "Help Type: " + type + "\n" +
        "Request ID: " + requestId
    );


    // Clear form
    event.target.reset();
}

    
        





    






    
