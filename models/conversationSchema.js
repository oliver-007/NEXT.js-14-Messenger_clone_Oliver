import mongoose from "mongoose";
import Message from "./messageSchema";

const conversationSchema = new mongoose.Schema(
  {
    name: String,
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    isGroup: Boolean,
    messagesIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    userIds: [
      {
        type: mongoose.Types.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Delete Message when conversation is removed
// reference ---- "https://mongoosejs.com/docs/middleware.html#pre"
conversationSchema.pre("remove", async function (next) {
  await Message.deleteMany({ conversationId: this._id });

  next();
});

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;
