$(document).ready(function() {

    let isResizing = false;
    let startPositionX, startPositionY, startWidth, startY, startHeight;

    
    $("#boldButton").click(function() {
        document.execCommand('bold', false, null);
    });

    $("#italicButton").click(function() {
        document.execCommand('italic', false, null);
    });

    $("#underline").click(function() {
        document.execCommand('underline', false, null);
    });

    $('#add-image').click(function() {
        // Create modal elements
        var modal = $('<div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-labelledby="imageModalLabel" aria-hidden="true">');
        var modalDialog = $('<div class="modal-dialog" role="document">');
        var modalContent = $('<div class="modal-content">');
        var modalHeader = $('<div class="modal-header">').html('<h5 class="modal-title" id="imageModalLabel">Add Image</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        var modalBody = $('<div class="modal-body">').html('<input type="file" id="imageInput" accept="image/*"><img id="previewImage" src="#" alt="Preview" style="display: none; max-width: 100%;">');
        var modalFooter = $('<div class="modal-footer">').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="saveImage">Save changes</button>');
  
        // Append modal elements to each other
        modalContent.append(modalHeader, modalBody, modalFooter);
        modalDialog.append(modalContent);
        modal.append(modalDialog);
  
        // Append modal to body
        $('body').append(modal);
  
        // Show modal
        $('#imageModal').modal('show');
      });


      $(document).on('click', '#saveImage', function() {
        var input = document.getElementById('imageInput');
      
        if (input.files && input.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function(e) {
                var image = $('<img>').attr('src', e.target.result).addClass('custom-image');
                
                // Append image to the editable div
                $('.note-editable').append(image);
    
                // Make the added image resizable
                image.resizable({
                    aspectRatio: true // Maintain aspect ratio while resizing
                });
            };
    
            reader.readAsDataURL(input.files[0]);
        }
    
        // Close modal
        $('#imageModal').modal('hide');
    });


   // Make the resizableDiv resizable


   const resizableDiv = document.getElementById('resizableDiv');

   resizableDiv.addEventListener('mousedown', function(event) {
    if (event.target === resizableDiv) {
        event.preventDefault();
        let startX = event.clientX;
        let startY = event.clientY;
        let startWidth = parseInt(document.defaultView.getComputedStyle(resizableDiv).width, 10);
        let startHeight = parseInt(document.defaultView.getComputedStyle(resizableDiv).height, 10);

        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);

        function resize(event) {
            resizableDiv.style.width = startWidth + event.clientX - startX + 'px';
            resizableDiv.style.height = startHeight + event.clientY - startY + 'px';
            event.stopPropagation(); // Prevent event propagation to the parent div
        }

        function stopResize() {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
        }
    }
});

resizableDiv.addEventListener('mousemove', function(event) {
    const { left, top, width, height } = resizableDiv.getBoundingClientRect();
    const resizeWidth = 15; // Width of the resizing area
    const resizeHeight = 15; // Height of the resizing area

    if (
        event.clientX >= left + width - resizeWidth && // Mouse is within the resize width range
        event.clientX <= left + width && // Mouse is within the width of the resizable div
        event.clientY >= top + height - resizeHeight && // Mouse is within the resize height range
        event.clientY <= top + height // Mouse is within the height of the resizable div
    ) {
        resizableDiv.style.cursor = 'se-resize'; // Set cursor to resize diagonally
    } else {
        resizableDiv.style.cursor = 'auto'; // Reset cursor to default
    }
});

// Allow focusing on the editable div
resizableDiv.addEventListener('mousedown', function(event) {
    resizableDiv.focus();
});
 

});


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

