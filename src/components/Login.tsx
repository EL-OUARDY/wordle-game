"use client";
import React from "react";
import useAuth from "@/hooks/useAuth";
import Button from "@/components/ui/button";
import clsx from "clsx";

interface Props {
  className?: string;
}
function Login({ className }: Props) {
  const { login } = useAuth();

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <h3 className="mx-auto text-center text-2xl">
        Track your progress, earn badges, and celebrate your Wordle wins.
      </h3>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="border-key-background mt-1 w-full border-t" />
        </div>
        <div className="relative flex justify-center text-lg">
          <span className="bg-background text-muted-foreground px-2">
            Log in or create a free account
          </span>
        </div>
      </div>

      <div className="mx-auto flex w-fit flex-col gap-2">
        <Button
          onClick={() => login()}
          variant="outline"
          className="w-64 rounded-none"
          aria-label="Share"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 2 * 0.05, duration: 0.2 },
          }}
        >
          <span className="flex w-1/2 items-center !justify-between gap-2">
            <svg
              className="size-5"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z"
                  fill="#EB4335"
                ></path>
              </g>
            </svg>
            <span className="flex-1 text-left text-lg normal-case">Google</span>
          </span>
        </Button>
        <Button
          variant="outline"
          className="w-64 rounded-none"
          aria-label="Share"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 3 * 0.05, duration: 0.2 },
          }}
        >
          <span className="flex w-1/2 items-center !justify-between gap-2">
            <svg
              className="size-5"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="url(#paint0_linear_87_7208)"
                ></circle>
                <path
                  d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z"
                  fill="white"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_87_7208"
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="29.917"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#18ACFE"></stop>
                    <stop offset="1" stopColor="#0163E0"></stop>
                  </linearGradient>
                </defs>
              </g>
            </svg>
            <span className="flex-1 text-left text-lg normal-case">
              Facebook
            </span>
          </span>
        </Button>
        <Button
          variant="outline"
          className="w-64 rounded-none"
          aria-label="Share"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 4 * 0.05, duration: 0.2 },
          }}
        >
          <span className="flex w-1/2 items-center !justify-between gap-2">
            <svg
              className="size-5"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M30 16C30 23.728 23.735 30 16 30C8.265 30 2 23.728 2 16C2 8.265 8.265 2 16 2C23.735 2 30 8.265 30 16Z"
                  fill="#283544"
                ></path>
                <path
                  d="M22.5621 12.4574C22.4857 12.502 20.6671 13.4425 20.6671 15.5279C20.7528 17.9061 22.9621 18.7401 23 18.7401C22.9621 18.7847 22.6665 19.8763 21.7907 21.0205C21.0956 22.0062 20.3242 23 19.1528 23C18.0385 23 17.6385 22.3431 16.3528 22.3431C14.972 22.3431 14.5813 23 13.5242 23C12.3528 23 11.5242 21.953 10.7913 20.9766C9.8391 19.6986 9.02978 17.6931 9.00121 15.7675C8.98195 14.7471 9.19189 13.744 9.72481 12.8921C10.477 11.7026 11.8198 10.8952 13.2863 10.8686C14.4099 10.8333 15.4099 11.5875 16.0956 11.5875C16.7528 11.5875 17.9814 10.8686 19.3714 10.8686C19.9714 10.8692 21.5714 11.0376 22.5621 12.4574ZM16.0006 10.6649C15.8006 9.73303 16.3528 8.80119 16.8671 8.20677C17.5242 7.48792 18.5621 7 19.4571 7C19.5143 7.93185 19.1522 8.84575 18.505 9.51136C17.9242 10.2302 16.9242 10.7714 16.0006 10.6649Z"
                  fill="white"
                ></path>
              </g>
            </svg>
            <span className="flex-1 text-left text-lg normal-case">
              Apple ID
            </span>
          </span>
        </Button>
        <Button
          variant="outline"
          className="w-64 rounded-none"
          aria-label="Share"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 5 * 0.05, duration: 0.2 },
          }}
        >
          <span className="flex w-1/2 items-center !justify-between gap-2">
            <svg
              className="size-5"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <rect
                  x="17"
                  y="17"
                  width="10"
                  height="10"
                  fill="#FEBA08"
                ></rect>
                <rect x="5" y="17" width="10" height="10" fill="#05A6F0"></rect>
                <rect x="17" y="5" width="10" height="10" fill="#80BC06"></rect>
                <rect x="5" y="5" width="10" height="10" fill="#F25325"></rect>
              </g>
            </svg>
            <span className="flex-1 text-left text-lg normal-case">
              Microsoft
            </span>
          </span>
        </Button>
      </div>
      <hr className="separator border-key-background" />
    </div>
  );
}

export default Login;
