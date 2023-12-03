import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: { type: String, required: true },
  provider: { type: String, unique: true, required: true },
  providerAccountId: { type: String, unique: true, required: true },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;
