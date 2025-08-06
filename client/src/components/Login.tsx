import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const temp: any = localStorage.getItem("dark");
    const mode = JSON.parse(temp);
    if (mode === null) {
      document.getElementById("html")?.classList.add("dark");
    } else {
      if (mode === true) {
        document.getElementById("html")?.classList.add("dark");
      } else {
        document.getElementById("html")?.classList.remove("dark");
      }
    }
  }, []);

  const handleLogin = () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/login`, {
        email: email,
        password: password
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      });
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-4/5 max-w-sm">
          <CardHeader className="justify-center">
            <CardTitle className="text-2xl border-b-2 pb-2 border-blue-500">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="w-full"
                disabled={!(email.length > 0 && password.length > 0)}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Login;
