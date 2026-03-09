import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", data);
      const { token, user } = res.data;
      // console.log(res.data);
      if(!res.ok){
        setServerError(res.data);
      }

      login({ token, user });

      if (user.role === "admin" || user.role === "super_admin") navigate("/user_overview");
      else navigate("/employee");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Server not reachable"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start bg-zinc-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 mt-20 rounded-[3%] bg-white px-8 pt-10 pb-8 shadow space-y-6"
      >
        <h1 className="px-2 text-4xl font-bold text-red-700 mb-6 text-center">
          !Treat
        </h1>

        {serverError && (
          <p className="text-red-600 text-center">{serverError}</p>
        )}

        <FieldGroup>
          {/* Email */}
          <Field>
            <FieldLabel>
              <FieldTitle>Email</FieldTitle>
            </FieldLabel>

            <FieldContent>
              <Input
                placeholder="Enter your email"
                {...register("email")}
                className="rounded-xl"
              />
              <FieldError errors={[errors.email]} />
            </FieldContent>
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel>
              <FieldTitle>Password</FieldTitle>
            </FieldLabel>

            <FieldContent>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="rounded-xl"
              />
              <FieldError errors={[errors.password]} />
            </FieldContent>
          </Field>
        </FieldGroup>

        <Button type="submit" className="w-full rounded-xl bg-blue-200 hover:bg-orange-50">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
