import express from "express";

const app = express();

app.use(express.json());

app.get("/api/ping", (_req, res) => {
    console.log("User has pinged the server");
    res.send("Pong!");
    return;
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});