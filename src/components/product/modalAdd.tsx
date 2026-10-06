import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { JSX } from "react/jsx-runtime"

interface Props {
    button: JSX.Element,
    formBody: JSX.Element,
    subTitle?: string,
    title: string
}

export function ModalAdd({button, formBody, subTitle, title} : Props) {
  return (
    <Dialog>
      <div>
        <DialogTrigger render={button} />
        <DialogContent className="sm:max-w-2xl gap-2">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {
                subTitle && (
                    <DialogDescription>
                        {subTitle}
                    </DialogDescription>                                    
                )
            }
          </DialogHeader>
            {formBody}            
          <DialogFooter className="mt-0">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}
