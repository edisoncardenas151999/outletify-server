const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;
const stripe = require("stripe")(process.env.SECRET_KEY);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
