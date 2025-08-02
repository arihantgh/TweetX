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
import { Link } from "react-router";
import { Textarea } from "./ui/textarea";

import axios from "axios";

function Home() {
  interface Tweet {
    id: number;
    username: string;
    content: string;
    likes: number;
    comments: {};
  }

  const username = "username";

  const [content, setContent] = useState("");
  const [poststatus, setPoststatus] = useState("Post");

  const [dark, setDark] = useState(true);
  const [tweets, setTweets] = useState([]);

  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const handlePost = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/tweets`, {
      username: username,
      content: content
    });
    setPoststatus("Posted!");
    setContent("");
    setTimeout(() => setPoststatus("Post more"), 1000);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/tweets`).then((response) => {
      setTweets(response.data);
      console.log("hello");
    });
  });

  return (
    <>
      <div className="flex items-center justify-between sticky top-0 z-50 p-5 bg-background">
        <div className="flex gap-2 items-center">
          <span className="font-medium text-lg">TweetX</span>
          <span className="font-medium text-lg text-blue-400">
            <Link to="/username">@username</Link>
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setDark(!dark)}>
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
                    onChange={handleContent}
                    spellCheck={false}
                    placeholder="What's happening?"
                  />
                </div>
                <Button onClick={handlePost}>{poststatus}</Button>
                <p>{content.length}/150</p>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      
      {tweets.map((tweet: Tweet) => (
        <div className="p-5" key={tweet.id}>
          <div className="bg-primary-foreground rounded-md p-5 gap-2">
            <div>
              <span>@{tweet.username}</span>
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
