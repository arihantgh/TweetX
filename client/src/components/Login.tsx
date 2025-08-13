import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/home")
    }
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

  const handleLogin = (e:any) => {
    console.log(email.toLowerCase())
    e.preventDefault();
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
            <CardTitle className="text-2xl">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email.toLowerCase()}
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
                type="submit"
                className="w-full"
                disabled={!(email.length > 0 && password.length > 0)}
              >
                Login
              </Button>
            </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Login;
