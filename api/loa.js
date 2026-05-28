```javascript
export default async function handler(req, res) {

    const name = req.query.name;

    if (!name) {
        return res.send("닉네임 없음");
    }

    try {

        const encodedName = encodeURIComponent(name);

        const response = await fetch(
            `https://developer-lostark.game.onstove.com/armories/characters/${encodedName}/profiles`,
            {
                headers: {
                    authorization: process.env.LOA_API_KEY,
                    accept: "application/json"
                }
            }
        );

        const data = await response.json();

        if (!data.CharacterName) {
            return res.send("캐릭터 없음");
        }

        const image = data.CharacterImage;

        const title =
            data.Title
            ? `${data.Title} ${data.CharacterName}`
            : data.CharacterName;

        const desc =
            `${data.ServerName} ${data.CharacterClassName} · ${data.ItemAvgLevel}`;

        res.setHeader("Content-Type", "text/html");

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

<body style="background:#111;color:white;text-align:center;font-family:sans-serif">

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
}
```
