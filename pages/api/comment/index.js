import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";
import User from "@/models/User";

export default async function handler(req, res) {
  const { owner, comment, forWhichContent } = req.body;
  const { method } = req;
  const { contentId, commentId } = req.query;
  await dbConnect();

  if (method === "GET") {
    if (!contentId) {
      return res.status(500).json({ message: "Please fill all the form" });
    }
    const comments = await Comment.find({ forWhichContent: contentId });
    if (comments?.length !== 0) {
      return res.status(200).json({ comments });
    }
    return res.status(200).json({ comments: [] });
  } else if (method === "POST") {
    if (!owner || !comment || !forWhichContent) {
      return res.status(500).json({ message: "Please fill all the form" });
    }

    const newComment = new Comment({
      owner,
      comment,
      forWhichContent,
    });

    await newComment.save();

    const comments = await Comment.find({ forWhichContent: forWhichContent });

    res.status(201).json(comments);
  } else if (method === "DELETE") {
    if (!commentId) {
      return res.status(500).json({ message: "Please fill all the form" });
    }

    await Comment.findByIdAndDelete(commentId);

    const comments = await Comment.find({ forWhichContent: contentId });

    res.status(200).json(comments);
  }
}
