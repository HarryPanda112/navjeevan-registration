document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;
  const activity = document.getElementById("activity").value;
  const startdate = document.getElementById("startdate").value;
  const fee = document.getElementById("fee").value || 500;

  var options = {
    "key": "rzp_test_1DP5mmOlF5G5ag", // Replace with your live Razorpay key
    "amount": fee * 100,
    "currency": "INR",
    "name": "Navjeevan School",
    "description": "Activity Registration Fee",
    "handler": function (response) {
      // Send form data to Google Sheets
      fetch("https://script.google.com/macros/s/AKfycbwxjtpKyc0IreAlbd1KCopKIliy3tAbQJmYvJN8n3ceS2PYpD7pGThlM4nXAEy0oq3x/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          mobile: mobile,
          email: email,
          activity: activity,
          startdate: startdate,
          fee: fee,
          payment_id: response.razorpay_payment_id
        })
      });

      alert("✅ Payment successful! ID: " + response.razorpay_payment_id);
      document.getElementById("registrationForm").reset();
    },
    "prefill": {
      "name": name,
      "email": email,
      "contact": mobile
    },
    "theme": {
      "color": "#003366"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
});
