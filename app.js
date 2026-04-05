// Firebase Configuration (Apna Firebase data yahan dale)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Admin Credentials
const ADMIN_USER = "MRGAJAN";
const ADMIN_PASS = "Abdul6353738585";

// Cloudinary QR URL
const QR_URL = "YOUR_CLOUDINARY_IMAGE_URL";

function login() {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
    } else {
        // Simple User Login Logic
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('user-dashboard').classList.remove('hidden');
        document.getElementById('qr-image').src = QR_URL;
        loadUserBalance(user);
    }
}

function updateTokens() {
    let uid = document.getElementById('target-uid').value;
    let amt = document.getElementById('token-amount').value;
    
    db.ref('users/' + uid).update({
        gajan_token_balance: amt
    }).then(() => alert("Tokens Updated Successfully!"));
}

function loadUserBalance(uid) {
    db.ref('users/' + uid + '/gajan_token_balance').on('value', (snap) => {
        document.getElementById('balance-display').innerText = "Balance: " + (snap.val() || 0);
    });
}
