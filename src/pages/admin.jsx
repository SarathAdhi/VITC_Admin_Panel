import Form from "@components/Form";
import Input from "@elements/Input";
import { PageLayout } from "@layouts/PageLayout";
import axios from "@lib/axios";
import { appStore } from "@utils/store";
import { showSuccessToast } from "@utils/toast";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as y from "yup";

const schema = y.object().shape({
  id: y.string().required("Enter the Username"),
  password: y.string().required("Enter the Password"),
});

const initialValue = {
  id: "",
  password: "",
};

const Home = () => {
  const router = useRouter();
  const { isAuth, setIsAuth } = appStore();

  useEffect(() => {
    if (isAuth) router.replace("/dashboard");
    else router.replace("/admin");
  }, []);

  return (
    <PageLayout
      title="Admin Login"
      className="flex-1 flex items-center justify-center"
    >
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        <Form
          schema={schema}
          initialValues={initialValue}
          // className="py-4 px-4"
          submitButton={{
            title: "Sign In",
          }}
          onSubmit={async (values) => {
            const res = await axios.post("/auth/login", values);

            if (res?.message) {
              showSuccessToast(res.message);
              setIsAuth(true);

              localStorage.setItem("token", res.token);
              router.replace("/dashboard");
            }
          }}
        >
          <Input label="Employee ID" name="id" />
          <Input label="Password" name="password" type="password" />
        </Form>
      </div>
    </PageLayout>
  );
};

export default Home;
