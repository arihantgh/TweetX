import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [signupdata, setSignupdata]: any = useState([]);

  const [checkusername, setCheckusername] = useState("");
  const [checkemail, setCheckemail] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/signup`).then((response) => {
      setSignupdata(response.data);
    });
  }, [signupdata]);

  useEffect(() => {
    for (let i = 0; i < signupdata.length; i++) {
      if (signupdata[i].username === username) {
        setCheckusername("username already taken, please choose another one.");
      } else {
        setCheckusername("");
      }
    }
  }, [username]);

  useEffect(() => {
    for (let i = 0; i < signupdata.length; i++) {
      if (signupdata[i].email === email) {
        setCheckemail("Email already in use, please choose another one.");
      } else {
        setCheckemail("");
      }
    }
  }, [email]);

  const navigate = useNavigate();

  const handleSignup = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, {
      username: username,
      email: email,
      password: password
    });
    localStorage.setItem("username", username);
    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Signup with Google
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or
              </span>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <p className="text-sm text-red-500">{checkemail}</p>
              <Dialog>
                <DialogTrigger
                  disabled={
                    email.length > 0 && password.length > 0 ? false : true
                  }
                >
                  <Button
                    className="w-full"
                    disabled={
                      email.length > 0 && password.length > 0 || checkemail.length===0 ? false : true
                    }
                  >
                    Signup
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <span className="font-medium">Choose Username</span>
                  <Input
                    placeholder="@username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    spellCheck="false"
                  />
                  <p className="text-sm text-red-500">{checkusername}</p>
                  <Button
                    className="w-full"
                    onClick={handleSignup}
                    disabled={checkusername.length > 0 ? true : false}
                  >
                    Confirm
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
