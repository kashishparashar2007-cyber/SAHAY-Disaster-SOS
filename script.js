// ==========================================
// SAHAY - Supabase Connection
// ==========================================

const SUPABASE_URL =
    "https://dnawvfoawtwyyuidcdwc.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "YOUR_PUBLISHABLE_KEY";

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


    // Save SOS request in Supabase
    // and get the actual database ID

    const { data, error } = await supabaseClient
        .from("sos_requests")
        .insert([
            {
                name: name,
                phone: phone,
                message: message
            }
        ])
        .select("id")
        .single();


    // If there is an error

    if (error) {

        console.error(
            "SOS ERROR:",
            error
        );

        alert(
            "❌ SOS submit nahi ho paya.\n\n" +
            "Message: " +
            error.message +
            "\n\n" +
            "Code: " +
            (error.code || "N/A")
        );

        return;
    }


    // Create user-friendly SOS ID

    const sosId =
        "SOS-" + data.id;


    // Show actual SOS ID

    alert(
        "🚨 SOS Request Sent!\n\n" +
        "Your emergency request has been registered successfully.\n\n" +
        "Your SOS Request ID is:\n" +
        sosId +
        "\n\n" +
        "Please save this ID to track your SOS status."
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


    // Check empty input

    if (!enteredId) {

        alert(
            "⚠️ Please enter your SOS Request ID."
        );

        return;
    }


    // Remove SOS- prefix if user enters SOS-5

    const id =
        enteredId.replace(
            /^SOS-/i,
            ""
        );


    // Search SOS request

    const { data, error } =
        await supabaseClient
            .from("sos_requests")
            .select(
                "id, name, message, status, created_at"
            )
            .eq("id", id)
            .single();


    // If request not found

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


    // Show SOS status

    result.innerHTML = `
        <div class="sos-result">

            <h3>
                🚨 SOS Request Found
            </h3>

            <p>
                <strong>
                    Request ID:
                </strong>
                SOS-${data.id}
            </p>

            <p>
                <strong>
                    Name:
                </strong>
                ${data.name}
            </p>

            <p>
                <strong>
                    Emergency:
                </strong>
                ${data.message}
            </p>

            <p>
                <strong>
                    Status:
                </strong>
                ${
                    data.status
                        ? data.status.toUpperCase()
                        : "PENDING"
                }
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

        helpType.value =
            type;
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
        document
            .getElementById("name")
            .value
            .trim();


    const phone =
        document
            .getElementById("phone")
            .value
            .trim();


    const type =
        document
            .getElementById("helpType")
            .value;


    const message =
        document
            .getElementById("message")
            .value
            .trim();


    // Check required fields

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


    // Insert help request into Supabase

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


    // Check error

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


    // Generate request ID for display

    const requestId =
        "REQ-" +
        Math.floor(
            Math.random() * 90000 + 10000
        );


    // Success message

    alert(
        "✅ Help Request Submitted!\n\n" +
        "Name: " +
        name +
        "\n" +
        "Help Type: " +
        type +
        "\n" +
        "Request ID: " +
        requestId
    );


    // Reset form

    event.target.reset();
}





    



    



        


    
        



    



    






    
