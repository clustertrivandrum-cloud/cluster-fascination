const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/your-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    try {
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();

      console.log("\n📋 Available collections:");
      collections.forEach((col) => console.log(`  - ${col.name}`));

      // Find the addresses collection
      const addressCollection = collections.find(
        (col) =>
          col.name === "addresses" ||
          col.name === "address" ||
          col.name === "Address"
      );

      if (!addressCollection) {
        console.log("\n⚠️  No addresses collection found");
        console.log("Available collections:", collections.map((c) => c.name).join(", "));
        process.exit(0);
      }

      console.log(`\n🔍 Found collection: ${addressCollection.name}`);

      // Check current validator
      const collInfo = await db
        .collection(addressCollection.name)
        .options();

      if (collInfo.validator) {
        console.log("\n📜 Current validator:");
        console.log(JSON.stringify(collInfo.validator, null, 2));
      } else {
        console.log("\n✅ No validator currently set");
      }

      // Remove the validator
      console.log("\n🔧 Removing validator...");
      await db.command({
        collMod: addressCollection.name,
        validator: {},
        validationLevel: "off",
      });

      console.log("✅ Validator removed successfully!");

      // Optional: Update any documents with address_line_2 to remove that field
      console.log("\n🔄 Checking for address_line_2 fields...");
      const docsWithLine2 = await db
        .collection(addressCollection.name)
        .find({ address_line_2: { $exists: true } })
        .toArray();

      if (docsWithLine2.length > 0) {
        console.log(`Found ${docsWithLine2.length} documents with address_line_2`);
        console.log("Removing address_line_2 from all documents...");

        await db.collection(addressCollection.name).updateMany(
          { address_line_2: { $exists: true } },
          { $unset: { address_line_2: "" } }
        );

        console.log("✅ Removed address_line_2 from all documents");
      } else {
        console.log("✅ No documents have address_line_2 field");
      }

      console.log("\n✨ Schema fix complete!");
      console.log("\nYou can now restart your server and try adding addresses again.");

    } catch (error) {
      console.error("\n❌ Error:", error);
    } finally {
      await mongoose.connection.close();
      console.log("\n🔌 Disconnected from MongoDB");
      process.exit(0);
    }
  })
  .catch((error) => {
    console.error("❌ Connection error:", error);
    process.exit(1);
  });
