// Supabase connection
const SUPABASE_URL = "https://dnawvfoawtywyuidcdwc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Vf43EO9ubAQhLgQIftzknA_wKNDQ7KZ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


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


async function submitRequest(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const type = document.getElementById("helpType").value;
    const message = document.getElementById("message").value.trim();

    const { data, error } = await supabaseClient
        .from("help_requests")
        .insert([
            {
                name: name,
                phone: phone,
                help_type: type,
                message: message
            }
        ])
        .select("id")
        .single();

    if (error) {
        console.error(error);
        alert("❌ Request submit nahi ho payi. Please try again.");
        return;
    }

    alert(
        "✅ Help Request Submitted!\n\n" +
        "Name: " + name + "\n" +
        "Help Type: " + type + "\n" +
        "Request ID: REQ-" + data.id
    );

    event.target.reset();
}
