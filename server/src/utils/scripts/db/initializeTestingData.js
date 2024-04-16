import config from "../../../config/index.js";
import connectToDB from "../../db/connect.js";
import { user } from "../../../models/user/user.js";
import { page } from "../../../models/page/page.js";
import { chat } from "../../../models/chat/chat.js";
import { colaborator } from "../../../models/colaborator/colaborator.js";
import { permission } from "../../../models/permission/permission.js";
import { message } from "../../../models/message/message.js";
import { permissions } from "../../constants/index.js";

if (config.node_environment !== "development") {
    process.exit(); // Only run in development mode
}

await connectToDB(config.db.url);

// Create collections
await user.createCollection();
await page.createCollection();
await chat.createCollection();
await colaborator.createCollection();
await permission.createCollection();
await message.createCollection();

// Check if there is a user already and create one for testing otherwise
const userExists = await user.findOne({ isAdmin: true }).lean();
if (!userExists) {
    await user.create({
        names: "Admin",
        lastnames: "Admin",
        email: config.server.admin.email,
        password: config.server.admin.password,
        isAdmin: true,
    });
}

// Check if permissions have been created
const permissionsExist = await permission.find({
    allowedAction: { $in: [permissions.colaborator.readDocs, permissions.colaborator.writeDocs] },
});
if (!permissionsExist.length) {
    await permission.insertMany(
        Object.keys(permissions.colaborator).map((key) => ({ allowedAction: permissions.colaborator[key] }))
    );
}

process.exit();