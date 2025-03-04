"use strict";



document.getElementById("sprite-upload").addEventListener("click", event => {
    event.preventDefault();

    const fileInput = document.getElementById("sprite-file");
    let new_sprite = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
            const fileData = e.target.result;
            
            fetch(`${api_url}/sprite/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({fileData})
            })
            .then(response => response.json())
            .then(data => {
                console.log("Sprite uploaded", data);
                fileInput.value = '';
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
        };
    
    reader.readAsDataURL(new_sprite);

})
