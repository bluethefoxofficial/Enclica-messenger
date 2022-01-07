var createPage = function(title, head, body) {
    var page = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="../assets/css/main.css" onload="this.media='all'" rel="stylesheet">
    <link href="../assets/css/loading.css" onload="this.media='all'" rel="stylesheet">
    <link href="../assets/css/buttonsandbackgrounds.css" rel="stylesheet">
    <link href="../assets/css/modals.css" onload="this.media='all'" rel="stylesheet">
    <link href="../assets/css/sidenav.css" onload="this.media='all'" rel="stylesheet">
    <link href="../assets/css/menubar.css" onload="this.media='all'" rel="stylesheet">
    <link href="../assets/css/grids.css" onload="this.media='all'" rel="stylesheet">

    <script src="../assets/js/jquery.js" type="text/javascript"></script>
    
    ${head}
    <title id="title">${title}</title>
</head>

            ${body}


    `;

    document.write(page);
}

module.exports.createPage = createPage;