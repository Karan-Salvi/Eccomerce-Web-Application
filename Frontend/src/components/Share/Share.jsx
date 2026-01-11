import { Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { TbCopy } from 'react-icons/tb';
import { TbCopyCheck } from 'react-icons/tb';

export default function Share({ url }) {
  const [textToCopy, setTextToCopy] = useState(
    url || 'https://cartloop.vercel.app/products'
  );
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopySuccess(true);
      })
      .catch((err) => {
        setCopySuccess(false);
        console.error('Error copying text: ', err);
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Share2 className="h-5 w-5" />
        {/* <Button variant="outline">Share</Button> */}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <div className="flex items-center gap-4">
              <Input id="link" defaultValue={textToCopy} readOnly />
              {/* <button onClick={handleCopy}>Copy to Clipboard</button> */}
              {copySuccess ? (
                <TbCopyCheck className="cursor-pointer text-2xl text-orange-600" />
              ) : (
                <TbCopy
                  onClick={handleCopy}
                  className="cursor-pointer text-2xl"
                />
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
