// Teachable Machine model URL
const URL = "https://teachablemachine.withgoogle.com/models/VcCIqC8sB/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup the webcam
    const flip = true; // Whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // Width, height, flip
    await webcam.setup(); // Request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // Append webcam canvas to DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // Add class labels to DOM
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // Update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// Run the webcam image through the image model
async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0 < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}
