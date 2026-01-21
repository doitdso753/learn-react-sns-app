import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import { toast } from "sonner";
import { useState } from "react";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password.ts";
import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth.ts";
import gitHubLogo from "@/assets/github-mark.svg"
import { generateErrorMessage } from "@/lib/error.ts";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword } = useSignInWithPassword({
    onError: (error) => {
      const message = generateErrorMessage(error);

      toast.error(message, {
        position: "top-center",
      });

      setPassword("");
    },
  });
  const { mutate: signInWithOAuth } = useSignInWithOAuth();

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({ email, password });
  };

  const handleSignInWithOAuthClick = () => {
    signInWithOAuth("github");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className={"text-xl font-bold"}>로그인</div>
      <div className={"flex flex-col gap-2"}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
          className={"py-6"}
          placeholder={"example@abc.com"}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          className={"py-6"}
          placeholder={"password"}
        />
      </div>
      <div className={"flex flex-col gap-2"}>
        <Button className={"w-full"} onClick={handleSignInWithPasswordClick}>
          로그인
        </Button>
        <Button
          className={"w-full"}
          variant={"outline"}
          onClick={handleSignInWithOAuthClick}
        >
          <img
            src={gitHubLogo}
            className="h-4 w-4"
            alt="GitHub 계정으로 로그인"
          />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div>
        <Link
          to={"/sign-up"}
          className={"text-muted-foreground hover:underline"}
        >
          계정이 없으시다면? 회원가입
        </Link>
      </div>
    </div>
  );
}
