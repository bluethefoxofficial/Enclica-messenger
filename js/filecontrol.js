function fileSelected(input) {

    swal({
        title: "Are you sure?",
        text: "Are you sure you want to upload this file to Enclica.",
        icon: "warning",
        buttons: [
          'No, cancel it!',
          'Yes, I am sure!'
        ],
        dangerMode: true,
      }).then(function(isConfirm) {
        if (isConfirm) {

            data = new FormData();
            data.append("serverid", currentserver);
            data.append("key", api);
            data.append("function", "upload");
            data.append("token", localStorage.getItem("token"));
            var attachment = document.getElementById(`attachment_${currentserver}`);
            data.append("fileToUpload", attachment.files[0]);
        
            $.ajax({
                type: 'POST',
                url: `https://${host}/api/api1.php`,
                data: data,
                cache: false,
                enctype: 'multipart/form-data',
                contentType: false,
                processData: false,
                xhr: function() {
                    var jqXHR = null;
                    if (window.ActiveXObject) {
                        jqXHR = new window.ActiveXObject("Microsoft.XMLHTTP");
                    } else {
                        jqXHR = new window.XMLHttpRequest();
                    }
        
                    //Upload progress
                    jqXHR.upload.addEventListener("progress", (function(evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round((evt.loaded * 100) / evt.total);
                            //Do something with upload progress
                            console.log('Uploaded percent', percentComplete);
                        }
                    }), false);
        
                    //Download progress
                    jqXHR.addEventListener("progress", (function(evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round((evt.loaded * 100) / evt.total);
                            //Do something with download progress
                            console.log('Downloaded percent', percentComplete);
                        }
                    }), false);
        
                    return jqXHR;
                },
                success: function(data) {
                    console.log("success");
                    console.log(data);
                    silent = 1;
                    swal("UPLOADED", "Your file has been uploaded to this enclica server.", "success");
                },
                error: function(data) {
                    swal("UPLOAD ERROR", "Your file has had an error when trying to upload. Please try again.", "error");
                    console.log(data);
                }
            });
        
        
        
            input.value = "";
            numberofmessages += 1;
        } else {
          swal("Cancelled", "Your cancelled the upload process.", "error");
        }
    
  });
  getmessages(); 
}
