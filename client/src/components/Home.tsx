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
import { Link } from "react-router";

function Home() {
  const username = localStorage.getItem("username");

  interface Tweet {
    id: number;
    username: string;
    content: string;
    likes: number;
    comments: {};
  }

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/tweets`).then((response) => {
      setTweets(response.data);
    });
  }, [tweets]);

  const [content, setContent] = useState("");
  const [poststatus, setPoststatus] = useState("Post");

  const [dark, setDark] = useState(true);

  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const handlePost = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/tweets`, {
      username: username,
      content: content
    });
    setContent("");
    setPoststatus("Post more");
  };

  return (
    <>
      {username ? (
        <div>
          <div className="flex items-center justify-between sticky top-0 z-50 p-5 bg-background">
            <div className="flex gap-2 items-center">
              <span className="font-medium text-lg">TweetX</span>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <span className="font-medium text-blue-400 text-lg">@{username}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem><Link to={`/profile/${username}`}>Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={()=>(localStorage.removeItem("username"))}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                    <Button variant="outline" className="w-fit font-normal">Add Image</Button>
                    {content.length>150 ? <p className="text-sm text-red-500">Character limit exceeded!</p> : <p></p>}
                    <Button onClick={handlePost} disabled={!(content.length>0 && content.length<151)}>{poststatus}</Button>
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
                  <span className="text-blue-400 font-medium">@{tweet.username}</span>
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
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen gap-2">
          <Button>
            <Link to="/signup">Signup</Link>
          </Button>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      )}
    </>
  );
}

export default Home;
