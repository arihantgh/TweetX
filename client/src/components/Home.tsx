import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateTweet from "./CreateTweet";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

function Home() {
  const [dark, setDark] = useState(true);
  return (
    <>
      <div className="flex items-center justify-between sticky top-0 z-50 p-5 bg-background">
        <div>
          <span className="font-medium text-lg">TweetX</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={()=>setDark(!dark)}>{dark ? <Sun /> : <Moon />}</Button>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="default">Post</Button>
              </DialogTrigger>
              <CreateTweet />
            </form>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default Home;
