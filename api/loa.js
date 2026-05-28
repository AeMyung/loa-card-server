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
                    authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNzc4MzEifQ.Ee2onDxFhv7O5EEpMLfG_DEfxiOPspBLPEb8JmY9dWbUrXilR-lzkqZ5CGUEHp66wZrCyHXDsEFO1-t_R6suFwwPLezTWZcdggfzF8-sm0gWe5ZM7pjGlTG4duJrhP2sE8wCyMBSQBOMQoq49dNLsvQd8yr96i8VLWDxuBnNv3UIOBBnUsHDQtc0BXuJW_FDd9b21ZZUVsBk5Iyy4xXaVWJwHJqKvhG7szDcdXvJF07l2NmizqNd52EsHIEjgXVFvDbJEkpP22NxTe4kkzAH905dOO55aTnmvStcDN4zI1pT6BTq_VqMfTgw5Krp21E3REd4YuMQ_5D3pNPNjXTPBw,
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
