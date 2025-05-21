// Get the container for the bars
const barContainer = document.getElementById('barContainer');
const resetButton = document.getElementById('resetArrayButton');

let arrayToSort = [];
const defaultArraySize = 30; // Number of bars

// Function to generate a new random array
function generateArray(size = defaultArraySize) {
    arrayToSort = [];
    for (let i = 0; i < size; i++) {
        arrayToSort.push(Math.floor(Math.random() * 100) + 5); // Values between 5 and 100
    }
}

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 swap
    }
}

// Function to render the array as bars
function renderBars(array) {
    barContainer.innerHTML = ''; // Clear previous bars
    const maxValue = Math.max(...array, 100); // Get max value in array, ensure it's at least 100 for full hue range
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}%`; 

        // Calculate hue: 0 for smallest values, up to 240 (blue) for largest values.
        // Adjust the multiplier (e.g., 240 / maxValue) to control the spread of colors.
        // A common gradient goes from red (0) to green (120) to blue (240).
        // We'll map our values (typically 5-100) to a part of this spectrum.
        // Let's map value to Hue: (value / maxValue) * 240.
        // Example: if value is 50 and maxValue is 100, hue is (50/100)*240 = 120 (green).
        // If value is 100 and maxValue is 100, hue is 240 (blue).
        // If value is 5 (min) and maxValue is 100, hue is (5/100)*240 = 12.
        const hue = (value / maxValue) * 240; 
        bar.style.backgroundColor = `hsl(${hue}, 70%, 50%)`; // Saturation 70%, Lightness 50%

        barContainer.appendChild(bar);
    });
}

// Initial setup function
function initializeVisualizer() {
    generateArray();
    shuffleArray(arrayToSort); // Ensure it's unsorted initially
    renderBars(arrayToSort);
}

// Event listener for the reset button
resetButton.addEventListener('click', initializeVisualizer);

// Call initializeVisualizer on page load
document.addEventListener('DOMContentLoaded', initializeVisualizer);

// Get the start sort button
const startSortButton = document.getElementById('startSortButton');

// Function to introduce a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Algorithm with visualization
async function bubbleSort(array) {
    const n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            // Highlight bars being compared (optional, can be added later)
            // For now, just focus on the swap and delay

            if (array[i] > array[i + 1]) {
                // Swap elements
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;

                // Re-render bars after a swap
                renderBars(array);
                // Wait for a short period to visualize the swap
                await sleep(500); // Adjusted for 0.5 second delay
            }
        }
    } while (swapped);

    // Final render to ensure correct state (optional, as renderBars is called after each swap)
    renderBars(array);
    return array;
}

// Event listener for the start sort button
startSortButton.addEventListener('click', async () => {
    // Disable buttons during sort to prevent interference
    startSortButton.disabled = true;
    resetButton.disabled = true;

    await bubbleSort(arrayToSort); // Call the sorting function

    // Re-enable buttons after sort is complete
    startSortButton.disabled = false;
    resetButton.disabled = false;
});
