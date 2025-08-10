import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  ChevronDown,
  Heart,
  MessageCircle,
  Moon,
  Sun,
  Trash2
} from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";

function Home() {
  type Tweet = {
    id: number;
    username: string;
    content: string;
    likes: [];
    comments: [];
  };

  type Comment = {
    username: string;
    comment: string;
  };

  const [content, setContent] = useState("");
  const [dark, setDark]: any = useState();
  const [username, setUsername] = useState("");
  const [tweets, setTweets] = useState([]);
  const [comment, setComment] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const temp: any = localStorage.getItem("dark");
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
        console.log(res.data[1])
      });
  }, [count]);

  const handleDarkmode = () => {
    if (dark === true) {
      document.getElementById("html")?.classList.remove("dark");
      setDark(false);
      localStorage.setItem("dark", `${false}`);
    } else {
      document.getElementById("html")?.classList.add("dark");
      setDark(true);
      localStorage.setItem("dark", `${true}`);
    }
  };

  const handleTweet = async () => {
    axios.post(
      `${import.meta.env.VITE_BASE_URL}/tweet`,
      {
        content: content
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then(()=>setCount(count+1));
    setContent("");
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (id:number) => {
    axios.post(
      `${import.meta.env.VITE_BASE_URL}/delete`,
      {
        tweetid: id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then(()=>setCount(count+1));
  }

  const handleComment = async (id:any) => {
    axios.post(
      `${import.meta.env.VITE_BASE_URL}/comment`,
      {
        tweetid: id,
        comment:comment
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    ).then(()=>setCount(count+1));
    setComment("")
  }

  return (
    <>
      <div className="flex items-center justify-between sticky top-0 z-50 p-5 bg-background">
        <div className="flex gap-2 items-center">
          <span className="font-medium text-lg">TweetX</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center outline-none">
              <span className="font-medium text-blue-400 text-lg">
                @{username}
              </span>
              <ChevronDown size={12} className="mx-1 bg-muted rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="flex items-center justify-between" onClick={handleDarkmode}>
                <p>Mode</p>
                <p>{!dark ? <Sun /> : <Moon />}</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 focus:text-red-400"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="default">Post</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">Post on TweetX</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    spellCheck={false}
                    placeholder="What's happening?"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-fit font-normal"
                  disabled
                >
                  Add Image
                </Button>
                {content.length > 500 ? (
                  <p className="text-sm text-red-500">
                    Character limit exceeded!
                  </p>
                ) : (
                  ""
                )}
                <Button
                  disabled={!(content.length > 0 && content.length < 501)}
                  onClick={handleTweet}
                >
                  Post
                </Button>
                <p>{content.length}/500</p>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      {tweets.map((tweet: Tweet) => (
        <div className="pb-5 px-5" key={tweet.id}>
          <div className="bg-muted rounded-md p-5 gap-2 border">
            <div>
              <div className="flex justify-between items-center">
                <p className="text-blue-400 font-medium py-2">
                  @{tweet.username}
                </p>
                {username === tweet.username ? (
                  <Button
                  onClick={()=>handleDelete(tweet.id)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 />
                  </Button>
                ) : (
                  ""
                )}
              </div>
              <p>{tweet.content}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <Heart />
                {tweet.likes ? tweet.likes.length : 0}
                -todo
              </Button>
              <Dialog>
                <DialogTrigger>
                  <Button variant="outline" size="sm">
                    <MessageCircle />
                    {tweet.comments ? tweet.comments.length : 0}
                  </Button>
                </DialogTrigger>
                <DialogContent className="overflow-y-auto max-h-3/4">
                  <DialogHeader>
                    <DialogTitle className="text-xl">Comments</DialogTitle>
                  </DialogHeader>
                  <div className="flex gap-2 max-h-3/4">
                    <Input
                      type="text"
                      placeholder="Add comment"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button onClick={()=>{handleComment(tweet.id)}} disabled={!(comment.length>0)}>Send</Button>
                  </div>
                  <div>
                    {tweet.comments.length > 0 ? (
                      tweet.comments.map((comment: Comment) => (
                        <div className="flex gap-2 border rounded-md p-2 mb-2 bg-muted">
                          <p className="text-blue-400 font-medium">
                            @{comment.username}
                          </p>
                          <p>{comment.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center p-5">
                        <p>No comments</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;
