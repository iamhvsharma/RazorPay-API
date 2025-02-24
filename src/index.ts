require('dotenv').config();

import { app } from "./app";

// Listening on PORT : 8000
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT: ${process.env.PORT}`);
  });