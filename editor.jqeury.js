$(document).ready(function() {
    $("#boldButton").click(function() {
        document.execCommand('bold', false, null);
    });

    $("#italicButton").click(function() {
        document.execCommand('italic', false, null);
    });

    $("#underline").click(function() {
        document.execCommand('underline', false, null);
    });
});

// function changeTextSize(size) {
//     var elements = document.getElementsByClassName('text');
//     document.querySelector('.note-editable').style.fontSize = size + 'px';
// }

function changeTextSize(size) {
    var selection = window.getSelection();
    if (!selection.isCollapsed) {
        var range = selection.getRangeAt(0);
        var span = document.createElement('span');
        span.style.fontSize = size + 'px';

        // Wrap the selected text with the new span element
        range.surroundContents(span);
        
        // Merge adjacent spans
        mergeAdjacentSpans(span);
    } else {
        // Fallback: Apply font size to the entire editable area
        document.querySelector('.note-editable').style.fontSize = size + 'px';
    }
}

function mergeAdjacentSpans(span) {
    var prev = span.previousSibling;
    var next = span.nextSibling;
    
    // Merge with previous span if it exists and has the same style
    if (prev && prev.nodeType === Node.ELEMENT_NODE && prev.tagName === 'SPAN' && prev.style.fontSize === span.style.fontSize) {
        while (span.firstChild) {
            prev.appendChild(span.firstChild);
        }
        span.parentNode.removeChild(span);
        span = prev;
    }
    
    // Merge with next span if it exists and has the same style
    if (next && next.nodeType === Node.ELEMENT_NODE && next.tagName === 'SPAN' && next.style.fontSize === span.style.fontSize) {
        while (next.firstChild) {
            span.appendChild(next.firstChild);
        }
        next.parentNode.removeChild(next);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var dropdownButton = document.getElementById('textSizeDropdown');
    var dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownButton.addEventListener('click', function () {
        dropdownMenu.classList.toggle('show');
    });

    // Close the dropdown menu when clicking outside of it
    window.addEventListener('click', function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});

