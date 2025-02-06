import{jsPDF} from "jspdf"
// get references to the form and display area
const Form = document.getElementById('resumeform') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
HTMLDivElement;

const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;

const shareableLinkElement = document.getElementById('shareable-link') as
HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as
HTMLButtonElement;

// handle form submission
Form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); //prevent page reload

    //collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value
    const phone = (document.getElementById('phone') as HTMLInputElement).value
    const email = (document.getElementById('email') as HTMLInputElement).value
    const linkedin = (document.getElementById('LinkedIn') as HTMLInputElement).value
    const education = (document.getElementById("education") as HTMLInputElement).value
    const skills = (document.getElementById('Skills') as HTMLInputElement).value
    const experience = (document.getElementById('experience') as HTMLInputElement).value

    // Save form data in localStorage with the username as the key
    
const resumeData = {
    name,
    email,
    phone,
    education,
    experience,
    skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

    //generate the resume content dynamically
    const resumeHTML = `
    <h2><b> Shareable Resume </b> </h2>
    <h3>Personal Information </h3>
    <p><b> Name: </b><span contenteditable="true">${name}</span></p>
    <p><b> Phone: </b><span contenteditable="true">${phone}</span></p>
    <p><b> Email: </b><span contenteditable="true">${email}</span></p>
    <p><b> LinkedIn: </b><span contenteditable="true">${linkedin}</span></p>

    <h3>Education</h3>
    <p><b> Education: </b><span contenteditable="true">${education}</span></p>

    <h3> Skills</h3>
    <p><b> Skills: </b><span contenteditable="true">${skills}</span></p>

    <h3>Experience</h3>
    <p><b> Experience: </b><span contenteditable="true">${experience}</span></p>
    
    `;

    //display the generated resume
    if(resumeDisplayElement){
        resumeDisplayElement.innerHTML = resumeHTML;
    }else{
        console.error("The resume display element is missing.");
    }

    // Show shareable link container
    shareableLinkContainer.style.display = "block";

    // Generate shareable link
    const currentUrl = window.location.href.split('?')[0];
    const shareableUrl = `${currentUrl}?username=${username}`;
    shareableLinkElement.href = shareableUrl;
    shareableLinkElement.textContent = shareableUrl;
});

// Handle PDF download
downloadPdfButton.addEventListener('click', async () => {
    // const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(resumeDisplayElement.innerText, 10, 10);
    doc.save("resume.pdf");
});

    // Prefill the form based on the username in the URL
    window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('username') as HTMLInputElement).value =
username;
(document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
(document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
(document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
(document.getElementById('experience') as HTMLTextAreaElement).value
= resumeData.experience;
(document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills;
}
}
});