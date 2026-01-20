import { Routes, Route, Navigate } from "react-router";
import SignInPage from "@/pages/sign-in-page.tsx";
import SignUpPage from "@/pages/sign-up-page.tsx";
import ForgotPasswordPage from "@/pages/forgot-password-page.tsx";
import IndexPage from "@/pages/index-page.tsx";
import PostDetailPage from "@/pages/post-detail-page.tsx";
import ProfileDetailPage from "@/pages/profile-detail-page.tsx";
import ResetPasswordPage from "@/pages/reset-password-page.tsx";

export default function RootRoute() {
  return (
    <Routes>
      <Route path={"/sign-in"} element={<SignInPage />} />
      <Route path={"/sign-up"} element={<SignUpPage />} />
      <Route path={"/forgot-password"} element={<ForgotPasswordPage />} />

      <Route path={"/"} element={<IndexPage />} />
      <Route path={"/post/:postId"} element={<PostDetailPage />} />
      <Route path={"/profile/:userId"} element={<ProfileDetailPage />} />
      <Route path={"/reset-password"} element={<ResetPasswordPage />} />

      <Route path={"*"} element={<Navigate to={"/"} />} />
    </Routes>
  );
}