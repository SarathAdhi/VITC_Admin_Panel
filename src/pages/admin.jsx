import Form from "@components/Form";
import Input from "@elements/Input";
import { H6 } from "@elements/Text";
import { PageLayout } from "@layouts/PageLayout";
import axios from "@lib/axios";
import { appStore } from "@utils/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as y from "yup";

const schema = y.object().shape({
  username: y.string().required("Enter the Username"),
  password: y.string().required("Enter the Password"),
});

const initialValue = {
  username: "",
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
    <PageLayout title="Admin Login" className="flex-1 flex justify-center">
      <div className="mt-10 w-full max-w-[500px] rounded-sm overflow-hidden">
        <div className="bg-[#1e4b8e] py-2 px-4">
          <H6 className="text-white">Login to Admin Access</H6>
        </div>

        <Form
          schema={schema}
          initialValues={initialValue}
          className="py-4 px-4 border"
          submitButton={{
            title: "Sign In",
            className: "bg-[#0d6efd] text-sm text-white px-2 py-1",
          }}
          onSubmit={async (values) => {
            const res = await axios.post("/admin/login", values);

            if (res?.message) {
              alert(res.message);
              setIsAuth(true);

              localStorage.setItem("token", res.token);
              router.replace("/dashboard");
            }
          }}
        >
          <Input label="Username" name="username" />
          <Input label="Password" name="password" type="password" />
        </Form>
      </div>
    </PageLayout>
  );
};

export default Home;
