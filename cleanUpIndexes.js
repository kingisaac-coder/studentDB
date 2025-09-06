const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const collection = mongoose.connection.db.collection("students");

    // List current indexes
    const indexes = await collection.indexes();
    console.log("Current Indexes:", indexes);

    // Drop the old username index if it exists
    if (indexes.some(i => i.name === "username_1")) {
      await collection.dropIndex("username_1");
      console.log("✅ Dropped username_1 index");
    } else {
      console.log("ℹ️ No username_1 index found");
    }

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();
