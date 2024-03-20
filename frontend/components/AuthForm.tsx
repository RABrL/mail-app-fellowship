"use client";

import { useState } from "react";
import { toast } from "sonner";

import { loginUser } from "@/services/loginUser";
import { createUser } from "@/services/createUser";
import useModal from "@/hooks/useModalStore";

import { InputForm } from "./SendEmailForm";
import { useRouter } from "next/navigation";
import { AuthFormProps } from "@/types/authform";

const AuthForm = ({ isLogin, className }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginState, setIsLoginState] = useState(isLogin);
  const router = useRouter();

  const onOpen = useModal((state) => state.onOpen);
  const onClose = useModal((state) => state.onClose);

  const buttonText = isLoginState ? "Login" : "Register";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const [error, data] = isLoginState
        ? await loginUser(formData)
        : await createUser(formData);

      if (error) throw error;

      isLoginState
        ? toast.success(`Welcome back ${data.user}`)
        : toast.success("The user has been created. Now you can login.");

      !isLoginState && onClick();
      router.refresh();
      form.reset();
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      return toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = () => {
    setIsLoginState(!isLoginState);
    onClose();
    onOpen(isLoginState ? "signUp" : "signIn");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`${className ?? ""} flex flex-col w-full gap-3`}
    >
      <div>
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <InputForm
          type="text"
          name="email"
          id="email"
          placeholder="pepito@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <InputForm type="password" name="password" placeholder="*******" />
      </div>
      {!isLoginState && (
        <div>
          <label htmlFor="confirmPassword" className="text-sm font-semibold">
            Confirm Password
          </label>
          <InputForm
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="*******"
          />
        </div>
      )}
      <div className="mx-auto text-xs text-neutral-500">
        {isLoginState ? (
          <button
            type="button"
            onClick={onClick}
            className="underline cursor-pointer hover:text-[#0F6CBD]"
          >
            Don&apos;t have an account? Sign up
          </button>
        ) : (
          <button
            type="button"
            onClick={onClick}
            className="underline cursor-pointer hover:text-[#0F6CBD]"
          >
            Already have an account? Sign in
          </button>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mx-auto w-full text-sm font-semibold rounded-md px-4 h-10 bg-[#0F6CBD] text-white hover:bg-[#0F548C] transition"
      >
        {isLoading ? "Loading..." : buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
