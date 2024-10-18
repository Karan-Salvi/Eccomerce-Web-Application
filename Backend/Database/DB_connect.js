const mongoose = require("mongoose");

const DB_connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`
    );

    if (!connectionInstance) {
      console.log("MongoDB connection failed");
    }
    console.log(
      "MongoDB connected Successfully on server : " +
        connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MongoDB connection failed due to some error :", error);
  }
};

module.exports = DB_connect;
