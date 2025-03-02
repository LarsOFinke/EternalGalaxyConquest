"use strict";



document.getElementById("sprite-upload").addEventListener("click", event => {
    event.preventDefault();

    let new_sprite = document.getElementById("sprite-file").files[0];

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
            .then(data => console.log("Sprite uploaded", data))
            .catch(error => {
                console.error('Error uploading file:', error);
            });
        };
    
    reader.readAsDataURL(new_sprite);

})
