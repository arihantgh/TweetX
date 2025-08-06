import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Heart, MessageCircle, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";

function Home() {
  type Tweet = {
    id: number;
    username: string;
    content: string;
    likes: number;
    comments: {};
  };

  const [content, setContent] = useState("");
  const [dark, setDark]: any = useState();
  const [username, setUsername] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/home`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        setUsername(res.data[0][0].username);
        setTweets(res.data[1]);
      });
  }, [setUsername, setTweets]);

  useEffect(() => {
    const temp:any = localStorage.getItem("dark")
    const mode = JSON.parse(temp);
    if (mode === null) {
      document.getElementById("html")?.classList.add("dark");
      localStorage.setItem("dark", `${true}`);
      setDark(true);
    } else {
      if (mode === true) {
        document.getElementById("html")?.classList.add("dark");
      } else {
        document.getElementById("html")?.classList.remove("dark");
      }
      setDark(mode);
    }
  }, []);

  const handleDarkmode = () => {
    if(dark===true){
      document.getElementById("html")?.classList.remove("dark");
      setDark(false)
      localStorage.setItem("dark",`${false}`)
    }
    else{
      document.getElementById("html")?.classList.add("dark");
      setDark(true)
      localStorage.setItem("dark",`${true}`)
    }
  };

  return (
    <>
      <div className="flex items-center justify-between sticky top-0 z-50 p-5 bg-background">
        <div className="flex gap-2 items-center">
          <span className="font-medium text-lg">TweetX</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <span className="font-medium text-blue-400 text-lg">
                @{username}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDarkmode}>
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="default">Post</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Post on TweetX</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    spellCheck={false}
                    placeholder="What's happening?"
                  />
                </div>
                <Button variant="outline" className="w-fit font-normal">
                  Add Image
                </Button>
                {content.length > 150 ? (
                  <p className="text-sm text-red-500">
                    Character limit exceeded!
                  </p>
                ) : (
                  ""
                )}
                <Button
                  disabled={!(content.length > 0 && content.length < 151)}
                >
                  Post
                </Button>
                <p>{content.length}/150</p>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      {tweets.map((tweet: Tweet) => (
        <div className="p-5" key={tweet.id}>
          <div className="bg-primary-foreground rounded-md p-5 gap-2 border">
            <div>
              <span className="text-blue-400 font-medium">
                @{tweet.username}
              </span>
              <p>{tweet.content}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Heart />
                {tweet.likes}
              </Button>
              <Button variant="outline">
                <MessageCircle />
                {Object.keys(tweet.comments).length}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;
