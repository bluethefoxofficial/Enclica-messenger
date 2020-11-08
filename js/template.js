var createPage = function(title, head, body){

    var page = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="../assets/css/main.css" rel="stylesheet">
    <link href="../assets/css/loading.css" rel="stylesheet">
    <link href="../assets/css/buttonsandbackgrounds.css" rel="stylesheet">
    <link href="../assets/css/modals.css" rel="stylesheet">
    <link href="../assets/css/sidenav.css" rel="stylesheet">
    <link href="../assets/css/menubar.css" rel="stylesheet">
    ${head}
    <title id="title">${title}</title>
</head>

            ${body}


    `;

    document.write(page);
}

module.exports.createPage = createPage;