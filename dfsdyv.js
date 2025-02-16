// Create the Export button with similar styling as Settings button
function createExportButton() {
    const settingsButton = document.querySelector('[data-element-id="workspace-tab-settings"]');
    const exportButton = document.createElement('button');
    
    exportButton.className = settingsButton.className;
    exportButton.innerHTML = `
        <span class="text-white bg-white/20 self-stretch h-12 md:h-[50px] px-0.5 py-1.5 rounded-xl flex-col justify-start items-center gap-1.5 flex transition-colors">
            <svg class="fill-white w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16l-4-4h8l-4 4zm0-12l4 4H8l4-4z" fill="currentColor"/>
            </svg>
            <span class="font-semibold self-stretch text-center text-xs leading-4 md:leading-none">Export</span>
        </span>
    `;
    
    // Add click event handler for export functionality
    exportButton.addEventListener('click', exportData);
    
    // Insert the export button after settings button
    settingsButton.parentNode.insertBefore(exportButton, settingsButton.nextSibling);
}

// Function to export data
function exportData() {
    // Collect all data from localStorage
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localStorageData[key] = localStorage.getItem(key);
    }
    
    // Get data from keyval-store if available
    let exportData = {
        localStorage: localStorageData,
        keyvalStore: {} // Add keyval-store data here if available
    };
    
    // Convert data to JSON string
    const dataStr = JSON.stringify(exportData, null, 2);
    
    // Create blob and download link
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'exported_data.json';
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', createExportButton);
