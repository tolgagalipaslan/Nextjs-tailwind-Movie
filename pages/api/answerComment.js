import dbConnect from "@/lib/dbConnect";
import Answer from "@/models/Answer";
import Comment from "@/models/Comment";

export default async function handler(req, res) {
  const { whichComment, whoAnswer, contentId, newComment } = req.body;
  const { method } = req;

  await dbConnect();

  if (method === "PATCH") {
    if (!whichComment || !whoAnswer || !contentId || !newComment) {
      return res.status(500).json({ message: "Something went wrong!" });
    }

    const comment = await Comment.findById(whichComment);

    const oldList = comment?.answers || [];

    const newAnswer = new Answer({
      owner: {
        id: whoAnswer.id,
        username: whoAnswer.username,
        image: whoAnswer.image,
      },
      comment: newComment,
      forWhichComment: whichComment,
    });

    const dbRes = await newAnswer.save();

    const response = await Comment.findByIdAndUpdate(
      whichComment,
      { answers: [...oldList, dbRes] },
      { new: true }
    );

    const comments = await Comment.find({ forWhichContent: contentId });

    return res.status(200).json(comments);
  }
}
