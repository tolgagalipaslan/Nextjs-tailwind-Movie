import { Alert, Avatar, Button, Modal, Tag } from "antd";
import { Input } from "antd";
const { TextArea } = Input;

import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineExclamationCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
const Comments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="container flex gap-5 pb-5">
        <div className="w-2/3 ">
          <div className="flex">
            <div className="bg-mainBlack2 w-fit px-4 py-2 font-semibold text-mainDarkRed rounded-t-md">
              Comments (3)
            </div>
          </div>
          <div className="flex flex-col gap-5 p-5 pb-10 bg-mainBlack2 rounded-b-md rounded-r-md">
            <div className=" flex flex-col gap-3">
              <div className="flex gap-5 w-full">
                <Avatar
                  src="/assets/default-pp.jpg"
                  size={50}
                  className="aspect-square w-[50px] min-w-[50px]"
                ></Avatar>
                <div className="flex flex-col gap-1 text-white w-full">
                  <div className="flex items-center justify-between w-full ">
                    <div className=" flex text-md items-center gap-2">
                      John Wick{" "}
                      <Tag className="select-none text-md" color="#c81c22">
                        Admin
                      </Tag>
                    </div>
                    <div className="text-white text-xs"> 9 Hours Before</div>
                  </div>
                  <div className="text-mainGray/90 text-md">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
                    similique. Laudantium eligendi sint veniam architecto omnis
                    porro! Obcaecati similique reiciendis dolores dignissimos
                    earum esse aut, pariatur, inventore error sed non.
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <AiOutlineHeart className="text-lg" />
                      Like
                    </button>
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <BiShare className="text-lg" />
                      Answer
                    </button>
                    <button
                      onClick={showModal}
                      className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300"
                    >
                      <AiOutlineExclamationCircle className="text-lg" /> Report
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="flex gap-5 w-full">
                <Avatar
                  src="/assets/default-pp.jpg"
                  size={50}
                  className="aspect-square w-[50px] min-w-[50px]"
                ></Avatar>
                <div className="flex flex-col gap-1 text-white w-full">
                  <div className="flex items-center justify-between w-full ">
                    <div className=" flex text-md items-center gap-2">
                      Rock{" "}
                    </div>
                    <div className="text-white text-xs"> 9 Hours Before</div>
                  </div>
                  <div className="text-mainGray/90 text-md">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
                    similique. Laudantium eligendi sint veniam architecto omnis
                    porro! Obcaecati similique reiciendis dolores dignissimos
                    earum esse aut, pariatur, inventore error sed non.
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <AiOutlineHeart className="text-lg" />
                      Like
                    </button>
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <BiShare className="text-lg" />
                      Answer
                    </button>
                    <button
                      onClick={showModal}
                      className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300"
                    >
                      <AiOutlineExclamationCircle className="text-lg" /> Report
                    </button>{" "}
                  </div>
                </div>
              </div>
              <div className="flex pl-[60px] gap-5 w-full">
                <Avatar
                  src="/assets/default-pp.jpg"
                  size={50}
                  className="aspect-square w-[50px] min-w-[50px]"
                ></Avatar>
                <div className="flex flex-col gap-1 text-white w-full">
                  <div className="flex items-center justify-between w-full ">
                    <div className=" flex text-md items-center gap-2">
                      John Wick{" "}
                      <Tag className="select-none text-md" color="#c81c22">
                        Admin
                      </Tag>
                    </div>
                    <div className="text-white text-xs"> 9 Hours Before</div>
                  </div>
                  <div className="text-mainGray/90 text-md">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
                    similique. Laudantium eligendi sint veniam architecto omnis
                    porro! Obcaecati similique reiciendis dolores dignissimos
                    earum esse aut, pariatur, inventore error sed non.
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <AiOutlineHeart className="text-lg" />
                      Like
                    </button>
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <BiShare className="text-lg" />
                      Answer
                    </button>
                    <button
                      onClick={showModal}
                      className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300"
                    >
                      <AiOutlineExclamationCircle className="text-lg" /> Report
                    </button>{" "}
                  </div>
                </div>
              </div>
              <div className="flex pl-[120px] gap-5 w-full">
                <Avatar
                  src="/assets/default-pp.jpg"
                  size={50}
                  className="aspect-square w-[50px] min-w-[50px]"
                ></Avatar>
                <div className="flex flex-col gap-1 text-white w-full">
                  <div className="flex items-center justify-between w-full ">
                    <div className=" flex text-md items-center gap-2">
                      John Wick{" "}
                      <Tag className="select-none text-md" color="#c81c22">
                        Admin
                      </Tag>
                    </div>
                    <div className="text-white text-xs"> 9 Hours Before</div>
                  </div>
                  <div className="text-mainGray/90 text-md">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
                    similique. Laudantium eligendi sint veniam architecto omnis
                    porro! Obcaecati similique reiciendis dolores dignissimos
                    earum esse aut, pariatur, inventore error sed non.
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <AiOutlineHeart className="text-lg" />
                      Like
                    </button>
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <BiShare className="text-lg" />
                      Answer
                    </button>
                    <button
                      onClick={showModal}
                      className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300"
                    >
                      <AiOutlineExclamationCircle className="text-lg" /> Report
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="flex gap-5 w-full">
                <Avatar
                  src="/assets/default-pp.jpg"
                  size={50}
                  className="aspect-square w-[50px] min-w-[50px]"
                ></Avatar>
                <div className="flex flex-col gap-1 text-white w-full">
                  <div className="flex items-center justify-between w-full ">
                    <div className=" flex text-md items-center gap-2">
                      John Wick{" "}
                      <Tag className="select-none text-md" color="#c81c22">
                        Admin
                      </Tag>
                    </div>
                    <div className="text-white text-xs"> 9 Hours Before</div>
                  </div>
                  <div className="text-mainGray/90 text-md">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
                    similique. Laudantium eligendi sint veniam architecto omnis
                    porro! Obcaecati similique reiciendis dolores dignissimos
                    earum esse aut, pariatur, inventore error sed non.
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <AiOutlineHeart className="text-lg" />
                      Like
                    </button>
                    <button className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300">
                      <BiShare className="text-lg" />
                      Answer
                    </button>
                    <button
                      onClick={showModal}
                      className="bg-transparent text-white flex items-center gap-1 hover:text-mainDarkRed duration-300"
                    >
                      <AiOutlineExclamationCircle className="text-lg" /> Report
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
            {/* <Alert
            message="Only registered members can comment. You can register in a few seconds."
            type="info"
            showIcon
          /> */}
            <div className="relative">
              <TextArea
                placeholder="Leave a comment"
                className="comment-send-input h-[150px]"
                showCount
                style={{
                  resize: "none",
                }}
                maxLength={250}
              />
              <Button
                type="link"
                className="bg-transparent text-white absolute bottom-1 right-0 z-20 text-lg"
              >
                <FiSend />
              </Button>
            </div>
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
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="relative">
          <TextArea
            placeholder="Why you reporting this comment ?"
            className="comment-send-input h-[150px] my-5"
            showCount
            style={{
              resize: "none",
            }}
            maxLength={250}
          />
        </div>
      </Modal>
    </>
  );
};

export default Comments;
