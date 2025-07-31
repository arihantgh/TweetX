import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";

import { useState } from "react";
import axios from "axios";

function CreateTweet() {
  const username = "username";

  const [content, setContent] = useState("");

  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const handlePost = () => {
    axios.post("/api/post", {
      username: username,
      content: content
    });
  };

  return (
    <>
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
        <Button onClick={handlePost}>
          Post
        </Button>
        <p>{content.length}/150</p>
      </DialogContent>
    </>
  );
}

export default CreateTweet;
