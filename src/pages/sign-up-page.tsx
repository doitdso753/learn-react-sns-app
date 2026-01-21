import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import { useState } from "react";
import { useSignUp } from "@/hooks/mutations/use-sign-up.ts";

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {mutate: signUp} = useSignUp();

  const handleSignUpClick = () => {
    if (email.trim() === '') return;
    if (password.trim() === '') return;

    signUp({ email, password });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className={"text-xl font-bold"}>회원가입</div>
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
      <div>
        <Button className={"w-full"} onClick={handleSignUpClick}>
          회원가입
        </Button>
      </div>
      <div>
        <Link
          to={"/sign-in"}
          className={"text-muted-foreground hover:underline"}
        >
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
