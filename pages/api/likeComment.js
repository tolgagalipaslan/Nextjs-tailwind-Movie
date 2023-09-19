import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";

export default async function handler(req, res) {
  const { whichComment, whoLiked, contentId } = req.body;
  const { method } = req;

  await dbConnect();

  if (method === "PATCH") {
    if (!whichComment || !whoLiked || !contentId) {
      return res.status(500).json({ message: "Something went wrong!" });
    }

    const comment = await Comment.findById(whichComment);

    const likeIsExist = comment?.likes?.find((i) => i === whoLiked);
    const oldList = comment?.likes || [];
    if (likeIsExist) {
      const newList = oldList.filter((i) => i !== whoLiked);

      const response = await Comment.findByIdAndUpdate(
        whichComment,
        { likes: newList },
        { new: true }
      );

      const comments = await Comment.find({ forWhichContent: contentId });

      return res.status(200).json(comments);
    } else {
      const newList = [...oldList, whoLiked];

      const response = await Comment.findByIdAndUpdate(
        whichComment,
        { likes: newList },
        { new: true }
      );
      const comments = await Comment.find({ forWhichContent: contentId });

      return res.status(200).json(comments);
    }
  }
}
