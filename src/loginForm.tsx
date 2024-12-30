import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import users from './users.json';

const loginSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(6, { message: "Username must be at least 6 characters" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginFormComponent: FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const user = users.find(
      (user) => user.username === data.username && user.password === data.password
    );

    if (user) {
      navigate("/success", { state: { username: user.username } }); 
    } else {
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#38C5AB] to-[#2739A4] flex items-center justify-center'>
    <div className="mx-auto p-6 border rounded-lg shadow-xl bg-white w-[360px] min-h-[350px]">
      <h1 className="text-2xl font-semibold mb-4 pl-[54px] text-[#2739A4]">Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col justify-center items-center'>
        {/* Username Field */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {loginError && (
              <p className="text-red-500 text-sm mt-2">
                {loginError}
              </p>
            )}
        <div>
          <button
            type="submit"
            className="w-full min-w-[100px] bg-[#2960E0] text-white px-4 py-2 rounded-md hover:bg-blue-500 mt-6"
          >
            Log in
          </button>
        </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export const LoginForm = memo(LoginFormComponent);

