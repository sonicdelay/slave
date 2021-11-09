const list = [
    'Apfel', 'Birne', 'Kirsche', 'Holunder'
];

const template = `
<html>
<head>
<title>Cradle</title>
<script type="module" src="js/index.js"></script>
<head>
<body>
<h1>${new Date()}</h1>
<ul>
${list.map((item, i) => `<li>${i} - ${item}</li>`).join('')}
</ul>
</body>
</html>
`;

res.status(200);
res.send(template);