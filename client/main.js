const resumeInput = document.querySelector('#resume-input');
const parseBtn = document.querySelector('#parse-btn');
const jsonOutput = document.querySelector('#json-output');
const resultSection = document.querySelector('#result-section');

parseBtn.addEventListener('click', async () => {
    const text = resumeInput.value.trim();
    if (!text) return alert("Paste some text first!");

    parseBtn.disabled = true;
    parseBtn.textContent = "Analyzing Structure...";

    try {
        const response = await fetch('http://localhost:3000/parse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        jsonOutput.textContent = JSON.stringify(data, null, 2);
        resultSection.style.display = "block";
    } catch (error) {
        alert("Make sure the server is running!");
    } finally {
        parseBtn.disabled = false;
        parseBtn.textContent = "Parse Resume";
    }
});