import { Alert, Avatar, Button, Form, Modal, Tag, message } from "antd";
import { Input } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const { TextArea } = Input;

import React, { useState } from "react";
import { useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineExclamationCircle,
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
const Comments = ({ comments, setComments, movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReporting, setReporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectComment, setSelectComment] = useState(null);
  const [reportComment, setReportComment] = useState("");
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const leaveAcomment = async (values) => {
    try {
      if (!session) {
        router.push("/auth/login");
        return;
      }

      if (values?.comment?.trim() === "" || values?.comment === undefined) {
        message.error("You cant leave a empty comment");
        return;
      }
      setCommentLoading(true);
      const res = await axios.post(`/api/comment`, {
        comment: values?.comment,
        owner: {
          id: session?.user?.id,
          image: session?.user?.image,
          username: session?.user?.username,
        },
        forWhichContent: movie?.id,
      });

      setComments(res?.data);
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    } finally {
      setCommentLoading(false);
    }
  };
  const handleReport = async () => {
    try {
      if (!session) {
        router.push("/auth/login");
        return;
      }

      if (reportComment.trim() === "") {
        message.error("You must fill all the form");
        return;
      }
      setReporting(true);
      const res = await axios.post(`/api/reportComment`, {
        whichComment: selectComment,
        why: reportComment,
        whoReported: session?.user?.id,
      });
      if (res?.data?.error === true) {
        message.error("You already reported this comment!");
        return;
      }
      setIsModalOpen(false);
      setSelectComment(null);
      setReportComment("");
      message.success("This comment reported");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    } finally {
      setReporting(false);
    }
  };

  const calculateTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDifferenceMilliseconds = currentDate - createdAtDate;

    const seconds = Math.floor(timeDifferenceMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day ago`;
    } else if (hours > 0) {
      return `${hours} hour ago`;
    } else if (minutes > 0) {
      return `${minutes} minute ago`;
    } else {
      return `${seconds} second ago`;
    }
  };

  const handleDeleteComment = async () => {
    try {
      if (!session) {
        router.push("/auth/login");
        return;
      }
      setIsDeleting(true);
      const res = await axios.delete(
        `/api/comment?commentId=${deleteCommentId}&contentId=${movie?.id}`
      );

      setComments(res?.data);
      setDeleteModal(false);
      message.success("Deletion successful");
    } catch (error) {
      message.error("Something went wrong !");
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      if (!session) {
        router.push("/auth/login");
        return;
      }
      setIsLoading(true);
      const res = await axios.patch(`/api/likeComment`, {
        whichComment: commentId,
        whoLiked: session?.user?.id,
        contentId: movie?.id,
      });

      setComments(res?.data);
    } catch (error) {
      message.error("Something went wrong !");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container flex gap-5 pb-5">
        <div className="w-full md:w-2/3 ">
          <div className="flex">
            <div className="bg-mainBlack2 w-fit px-4 py-2 font-semibold text-mainDarkRed rounded-t-md">
              Comments ({comments?.length})
            </div>
          </div>
          <div className="flex flex-col gap-5 p-5 pb-10 relative bg-mainBlack2 rounded-b-md rounded-r-md">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center backdrop-blur-md absolute left-0 top-0 z-30">
                <AiOutlineLoading3Quarters className="animate-spin text-mainDarkRed text-3xl" />
              </div>
            ) : null}

            <>
              {comments?.length !== 0 ? (
                comments?.map((comment, i) => (
                  <div key={i} className=" flex flex-col gap-3">
                    <div className="flex gap-5 w-full">
                      <Avatar
                        src={comment?.owner?.image}
                        alt="User"
                        size={50}
                        className="aspect-square w-[50px] min-w-[50px]"
                      ></Avatar>
                      <div className="flex flex-col gap-1 text-white w-full">
                        <div className="flex items-center justify-between w-full flex-wrap ">
                          <div className=" flex text-sm md:text-md items-center gap-2">
                            {comment?.owner?.username}
                          </div>
                          <div className="text-white text-xs">
                            {" "}
                            {isClient
                              ? calculateTimeDifference(comment?.createdAt)
                              : null}
                          </div>
                        </div>
                        <div className="text-mainGray/90 md:text-md text-xs">
                          {comment?.comment}
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              handleLikeComment(comment?._id);
                            }}
                            className={` ${
                              comment?.likes?.find(
                                (i) => i == session?.user?.id
                              )
                                ? "text-mainDarkRed"
                                : "text-white"
                            }  bg-transparent flex items-center gap-1 md:hover:text-mainDarkRed duration-300`}
                          >
                            <AiOutlineHeart className="md:text-lg text-md" />
                            Like
                          </button>
                          <button className="bg-transparent text-white flex items-center gap-1 md:hover:text-mainDarkRed duration-300">
                            <BiShare className="md:text-lg text-md" />
                            Answer
                          </button>
                          <button
                            onClick={() => {
                              showModal();
                              setSelectComment(comment?._id);
                            }}
                            className="bg-transparent text-white flex items-center gap-1 md:hover:text-mainDarkRed duration-300"
                          >
                            <AiOutlineExclamationCircle className="md:text-lg text-md" />{" "}
                            Report
                          </button>{" "}
                          {comment?.owner?.id === session?.user?.id ? (
                            <button
                              onClick={() => {
                                setDeleteModal(true);
                                setDeleteCommentId(comment?._id);
                              }}
                              className="bg-transparent text-white flex items-center gap-1 md:hover:text-mainDarkRed duration-300"
                            >
                              <BsTrash className="md:text-lg text-md" /> Delete
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-mainGray/90 md:text-md text-xs">
                  There are no comments for this movie on this site. Be the
                  first to comment.
                </div>
              )}
              <Form
                onFinish={(values) => leaveAcomment(values)}
                className="relative"
                form={form}
              >
                <Form.Item className="h-[130px]" name="comment">
                  <TextArea
                    placeholder="Leave a comment"
                    className="comment-send-input h-[150px]"
                    showCount
                    style={{
                      resize: "none",
                    }}
                    maxLength={250}
                  />
                </Form.Item>
                <Button
                  type="link"
                  htmlType="submit"
                  disabled={commentLoading}
                  className="bg-transparent text-white absolute bottom-1 -right-1 z-20 text-lg"
                >
                  {commentLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <FiSend />
                  )}
                </Button>
              </Form>
            </>
          </div>
        </div>
      </div>
      <Modal
        title="Send Your Report"
        open={isModalOpen}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        className="comment-report-modal "
        footer={[
          <Button
            className="bg-mainDarkRed text-white"
            key="back"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            className="bg-green-500 text-white"
            key="submit"
            type="button"
            onClick={handleReport}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="relative">
          <TextArea
            onChange={(e) => setReportComment(e.target.value)}
            placeholder="Why you reporting this comment ?"
            className="comment-send-input h-[150px] my-5"
            showCount
            value={reportComment}
            style={{
              resize: "none",
            }}
            maxLength={250}
          />
        </div>
      </Modal>
      <Modal
        title="Delete this comment"
        open={deleteModal}
        centered
        onCancel={() => setDeleteModal(false)}
        className="comment-report-modal "
        footer={[
          <Button
            className="bg-mainDarkRed text-white"
            key="back"
            type="button"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </Button>,
          <Button
            className="bg-green-500 text-white"
            key="submit"
            type="button"
            disabled={isDeleting}
            onClick={() => handleDeleteComment()}
          >
            {isDeleting ? (
              <AiOutlineLoading3Quarters className="animate-spin text-white" />
            ) : (
              "Delete"
            )}
          </Button>,
        ]}
      >
        <div className="text-mainGray/90 md:text-md text-xs">
          If you delete this comment, you cannot undo this action.
        </div>
      </Modal>
    </>
  );
};

export default Comments;
