import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateTweet from "./CreateTweet";
import { Heart, MessageCircle, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function Home() {
  const [dark, setDark] = useState(true);
  const [like,setLike] = useState(true);

  return (
    <>
      <div className="flex items-center justify-between sticky top-0 z-50 p-5 bg-background">
        <div className="flex gap-2 items-center">
          <span className="font-medium text-lg">TweetX</span>
          <span className="font-medium text-lg text-blue-400"><Link to='/username'>@username</Link></span>
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
              <CreateTweet />
            </form>
          </Dialog>
        </div>
      </div>

      <div className="p-5">
        <div className="bg-primary-foreground rounded-md p-5 gap-2">
          <div>
          <span>@username</span>
          <p>content</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={()=>setLike(!like)} variant={like?'destructive':'outline'}><Heart/>{"count"}</Button>
            <Button variant="outline"><MessageCircle/>{"count"}</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
