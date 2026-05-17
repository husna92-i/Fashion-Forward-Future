// =========================================================================
//                   FIREBASE INITIALIZATION & CONFIGURATION
// =========================================================================

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

// =========================================================================
//                     DOM CONTENT LOADED EVENT
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevents the browser from reloading the page

            // Get the input values from the form IDs in your contact.html file
            const contactName = document.getElementById("contact-name").value;
            const contactEmail = document.getElementById("contact-email").value;
            const contactMessage = document.getElementById("contact-message").value;

            // Generate clean timestamp for your beautiful email layout
            const submissionTimeStr = new Date().toLocaleString();

            // Simple visual feedback on the button
            const submitBtn = form.querySelector(".contact-submit-btn");
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "SUBMITTING...";
            submitBtn.disabled = true;

            try {
                // A. Add a new document with a generated ID to a collection named "contacts"
                const docRef = await addDoc(collection(db, "contacts"), {
                    name: contactName,
                    email: contactEmail,
                    message: contactMessage,
                    submittedAt: new Date() // Tracking timestamps helps keep entries organized
                });

                console.log("Document successfully written with ID: ", docRef.id); //

                // B. EmailJS Integration parameters matching your color template variables
                const emailParams = {
                    contact_name: contactName,
                    contact_email: contactEmail,
                    contact_message: contactMessage,
                    submission_time: submissionTimeStr
                };

                // Dispatch EmailJS request with your Account Credentials
                await emailjs.send('service_i0yt9mb', 'template_s7015di', emailParams);

                alert("Thank you! Your message has been submitted and email notification sent.");
                
                // Clear the form input fields
                form.reset(); 
            } catch (error) {
                console.error("Error during contact submission process: ", error); //
                alert("Something went wrong. Please try again later."); //
            } finally {
                // Restore the button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
