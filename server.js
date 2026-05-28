```javascript
const express = require("express");
const fetch = require("node-fetch");

const app = express();

const LOA_API_KEY = "여기에_너의_API_KEY";

app.get("/loa/:name", async (req, res) => {

    const characterName = req.params.name;

    try {

        const encodedName = encodeURIComponent(characterName);

        const response = await fetch(
            `https://developer-lostark.game.onstove.com/armories/characters/${encodedName}/profiles`,
            {
                headers: {
                    authorization: LOA_API_KEY,
                    accept: "application/json"
                }
            }
        );

        const data = await response.json();

        if (!data.CharacterName) {
            return res.send("캐릭터를 찾을 수 없습니다.");
        }

        const image = data.CharacterImage;
        const title = data.Title
            ? `${data.Title} ${data.CharacterName}`
            : data.CharacterName;

        const desc =
            `${data.ServerName} ${data.CharacterClassName} · ${data.ItemAvgLevel}`;

        res.send(`
<!doctype html>
<html>
<head>

<meta charset="utf-8">

<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${image}">
<meta property="og:type" content="website">

<title>${title}</title>

</head>

<body style="background:#111;color:white;font-family:sans-serif;text-align:center">

<img src="${image}" width="300">

<h1>${title}</h1>

<p>${desc}</p>

</body>
</html>
`);
    }

    catch (e) {
        res.send("오류 발생");
    }
});

app.listen(3000);
```
