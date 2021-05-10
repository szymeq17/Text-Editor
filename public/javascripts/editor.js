// creating json file with editor content and downloading it
function downloadJSONfile() {
    let html = document.getElementById("editor").innerHTML;
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({html: html}));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "text" + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// uploading file
function uploadJSONfile() {
    let filePicker = document.getElementById("file-picker");
    if(filePicker) {
        filePicker.click();
    }
}

// parsing file to JSON and inserting content to editor
// function is being called when file input changes (onchange)
async function insertTextToEditor(input) {
    let file = input.files.item(0);

    if (file) {
        let blob = new Blob([file]);
        await blob.text().then(result => {
            let content = JSON.parse(result);
            if (content && content.html) {
                document.getElementById("editor").innerHTML = content.html;
            }
        })
        .catch(err => {
            alert("Nie udało się wczytać pliku.");
        });
    }
}

window.onload = function() {
    var boldTool = document.getElementById("bold-tool");
    var italicTool = document.getElementById("italic-tool");
    var listTool = document.getElementById("list-tool");
    var toJSONbtn = document.getElementById("to-json-btn");
    var fromJSONbtn = document.getElementById("from-json-btn");

    document.getElementById('editor').setAttribute('contenteditable', 'true');

    // LISTENERS

    // bold
    boldTool.addEventListener("click", function() {
        document.execCommand("bold", false, null);
    });

    // italic
    italicTool.addEventListener("click", function() {
        document.execCommand("italic", false, null);
    });

    // list
    listTool.addEventListener("click", function() {
        document.execCommand("insertUnorderedList", false, null);
    });

    // handling download button
    toJSONbtn.addEventListener("click", downloadJSONfile);

    // handling upload button
    fromJSONbtn.addEventListener("click", uploadJSONfile);
    
}