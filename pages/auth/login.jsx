import { Button, Divider, Form, Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { BiArrowBack } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";
const Login = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className='h-screen w-full bg-[url("/assets/auth-bg.jpg")] bg-cover bg-center flex items-center justify-center p-3'>
      <Head>
        <title>Login</title>
      </Head>
      <Button
        htmltype="button"
        type="link"
        className="text-white absolute top-5 left-5 text-2xl"
      >
        <BiArrowBack onClick={() => router.back()} />
      </Button>

      <div className="bg-white p-10">
        <div className="text-center font-semibold text-4xl">Login</div>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              htmltype="email"
              className="w-[328px] h-[42px] rounded-none"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              htmltype="input"
              className="w-[328px] h-[42px] rounded-none"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="button"
              className="bg-mainDarkRed h-[42px] font-semibold text-white rounded-none w-full"
              htmltype="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Divider plain>Or</Divider>
        <Button
          htmltype="button"
          onClick={() => signIn("google")}
          className="bg-[#4889f4] p-1   h-[42px] text-white rounded-sm w-full  flex gap-3 items-center "
          type="button"
        >
          <div className="bg-white left-[2px] absolute h-[90%] flex items-center justify-center text-2xl aspect-square rounded-sm">
            <FcGoogle className="" />
          </div>

          <div className="text-white w-full text-center font-semibold">
            Sing in with google
          </div>
        </Button>
        <div className="text-sm text-center pt-5">
          Don't have an account?{" "}
          <Link href={"/auth/register"} className="text-blue-500 underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
