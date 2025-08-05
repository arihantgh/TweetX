import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Heart, MessageCircle, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";


import { Link } from "react-router";

function Home() {
  const [content, setContent] = useState("");
  const [dark, setDark] = useState(true);

  return (
    <>
      <div className="flex items-center justify-between sticky top-0 z-50 p-5 bg-background">
        <div className="flex gap-2 items-center">
          <span className="font-medium text-lg">TweetX</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <span className="font-medium text-blue-400 text-lg">
                @{"username"}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to={`/profile/${"username"}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                Logout
              </DropdownMenuItem>
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
                  <p></p>
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

      <div className="p-5">
        <div className="bg-primary-foreground rounded-md p-5 gap-2 border">
          <div>
            <span className="text-blue-400 font-medium">@username</span>
            <p>content</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Heart />
              20
            </Button>
            <Button variant="outline">
              <MessageCircle />
              10
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
