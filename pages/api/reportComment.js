import dbConnect from "@/lib/dbConnect";

import ReportComment from "@/models/ReportComment";

export default async function handler(req, res) {
  const { whichComment, whoReported, why } = req.body;
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    if (!whichComment || !whoReported || !why) {
      return res.status(500).json({ message: "Please fill all the form" });
    }
    const comment = await ReportComment.find({ whichComment: whichComment });
    const repotIsExist = comment.find((i) => i.whoReported === whoReported);
    if (repotIsExist) {
      return res.status(200).json({ message: "Error", error: true });
    }

    const newReport = new ReportComment({
      whichComment,
      whoReported,
      why,
    });

    await newReport.save();

    res.status(201).json({ message: "Success", error: false });
  }
}
