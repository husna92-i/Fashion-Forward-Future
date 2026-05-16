// 1. Import the specific Firebase and Firestore modules from the web CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7ax-Re_pr2mRJFAbLiFCLnHUOU8Babtk",
    authDomain: "fashionforwardfuture-20fa7.firebaseapp.com",
    projectId: "fashionforwardfuture-20fa7",
    storageBucket: "fashionforwardfuture-20fa7.firebasestorage.app",
    messagingSenderId: "1487409101",
    appId: "1:1487409101:web:8b18e370806221a0d7be84"
};

// Initialize Firebase and Firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Wait for the DOM to load, then select the HTML form element
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".volunteer-form");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevents the browser from reloading the page

            // Get the input values from the form IDs in your Volunteer.html file
            const volunteerName = document.getElementById("volunteer-name").value;
            const volunteerEmail = document.getElementById("volunteer-email").value;
            const volunteerPortfolio = document.getElementById("volunteer-portfolio").value;

            // Simple visual feedback on the button
            const submitBtn = form.querySelector(".volunteer-submit-btn");
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "SUBMITTING...";
            submitBtn.disabled = true;

            try {
                // 3. Add a new document with a generated ID to a collection named "volunteers"
                const docRef = await addDoc(collection(db, "volunteers"), {
                    name: volunteerName,
                    email: volunteerEmail,
                    portfolio: volunteerPortfolio || "No portfolio provided", // Fallback if left blank
                    submittedAt: new Date() // Tracking timestamps helps keep entries organized
                });

                console.log("Document successfully written with ID: ", docRef.id);
                alert("Thank you for applying! Your details have been submitted successfully.");
                
                form.reset(); // Clear the form input fields
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Something went wrong. Please try again later.");
            } finally {
                // Restore the button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});