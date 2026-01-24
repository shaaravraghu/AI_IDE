/* --- Whiteboard / Planning Logic --- */

const whiteboard = document.getElementById('whiteboard');
let scale = 1;

// Initialize Draggable Nodes
function initFlowNodes() {
    const nodes = document.querySelectorAll('.flow-node');
    nodes.forEach(makeDraggable);
}

// Zoom Functionality
function zoomBoard(factor) {
    scale *= factor;
    // Limit zoom
    if (scale < 0.5) scale = 0.5;
    if (scale > 2) scale = 2;

    // Apply transform to container
    whiteboard.style.transform = `scale(${scale})`;
    whiteboard.style.transformOrigin = 'center center'; // Zoom from center

    // Update text display
    document.querySelector('.zoom-level').textContent = Math.round(scale * 100) + '%';
}

function centerBoard() {
    scale = 1;
    whiteboard.style.transform = `scale(1)`;
    document.querySelector('.zoom-level').textContent = '100%';
    
    // Use the global showToast function
    if(typeof showToast === 'function') {
        showToast("Board Centered");
    }
}

// Draggable Logic (Fixed to not block buttons)
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = element.querySelector('.node-header');
    
    if(header) {
        header.onmousedown = dragMouseDown;
    } else {
        // Fallback if no header
        element.onmousedown = dragMouseDown;
    }
    
    function dragMouseDown(e) {
        // FIX: If the user clicked a button inside the header/element, do NOT start dragging
        if (e.target.closest('button')) {
            return; 
        }

        e.preventDefault();
        e.stopPropagation(); 
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        element.style.zIndex = 100; // Bring to front
    }

    function elementDrag(e) {
        e.preventDefault();
        // Calculate new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Set element's new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        element.style.zIndex = 5; // Reset z-index
    }
}

// Make functions global so HTML can call them
window.zoomBoard = zoomBoard;
window.centerBoard = centerBoard;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initFlowNodes();
});