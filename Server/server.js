const express = require("express");
const app = express();

app.use(express.json());

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "UserDatabase.db");
let db = null;

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// app.use("/", express.static("public"));
// app.use("/noteapp", express.static("noteapp"));
app.use("/noteapp", express.static(path.join(__dirname, "../Client/noteapp")));
app.use("/", express.static(path.join(__dirname, "../Client/public")));

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

const router = express.Router();

const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/....");
    });
  } catch (e) {
    console.log(`DB ERROR: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

// app.post("/login/", async (request, response) => {
//   const { username, password } = request.body;
//   const selectDbUser = `SELECT * FROM user WHERE username='${username}';`;
//   const dbUser = await db.get(selectDbUser);
//   if (dbUser === undefined) {
//     response.status(400);
//     response.send("Invalid user");
//   } else {
//     isPasswordMatch = await bcrypt.compare(password, dbUser.password);
//     if (isPasswordMatch === true) {
//       const payload = { username: username };
//       const jwtToken = jwt.sign(payload, "mySecretCode");
//       //   console.log(jwtToken);
//       response.send({ jwtToken });
//     } else {
//       response.status(400);
//       response.send("Invalid password");
//     }
//   }
// });

app.post("/register", async (request, response) => {
  const { providedUserName, providedPassword } = request.body;
  if (providedPassword.length < 6) {
    response.status(400);
    response.send({ title: "Password is too short" });
  } else {
    const hashPassword = await bcrypt.hash(providedPassword, 10);
    const updateNewUserInDB = `INSERT INTO 
          userTable (username,password)
          VALUES
          (
              '${providedUserName}',
              '${hashPassword}'
          );`;
    await db.run(updateNewUserInDB);
    response.status(200).send({ title: "User created successfully" });
  }
});

// router.post("/register", (req, res) => {
//   return response.redirect("/noteapp");
// });

app.get("/", (request, response) => {
  return response.sendFile(path.join(__dirname, "../Client/public/index.html"));
});

app.get("/noteapp", (request, response) => {
  return response.sendFile(
    path.join(__dirname, "../Client/noteapp/noteapp.html")
  );
});
