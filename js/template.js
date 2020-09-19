var createPage = function(title, head, body){

    var page = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="../assets/css/main.css" rel="stylesheet">
    ${head}
    <title id="title">${title}</title>
</head>
<body id="body">
    <div id="container">
        <main>
            ${body}
        </main>
    </div>
</body>
</html>
    `;

    document.write(page);
}

module.exports.createPage = createPage;

