import mongoose, { models } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    owner: { type: Object, required: true },
    comment: { type: String, required: true, maxlength: 255 },
    forWhichContent: { type: String, required: true },
    likes: { type: Array, default: [] },
    answers: { type: Array, default: [] },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Comment = models?.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
