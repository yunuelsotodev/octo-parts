'use client'
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
import { cloneElement, useState, type ReactElement } from "react"

interface Props {
  button?: JSX.Element,
  formBody: ReactElement<{ onSuccess?: () => void }>,
  subTitle?: string,
  title: string,
  open?: boolean,
  onOpenChange?: (open: boolean) => void,
}

export function ModalAdd({ button, formBody, subTitle, title, onOpenChange, open}: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <div>
        {
          button && (
            <DialogTrigger render={button} />
          )
        }
        <DialogContent className="sm:max-w-2xl gap-2">
          <DialogHeader>
            <DialogTitle className={'text-xl'}>{title}</DialogTitle>
            {
              subTitle && (
                <DialogDescription>
                  {subTitle}
                </DialogDescription>
              )
            }
          </DialogHeader>
          {cloneElement(formBody, { onSuccess: () => handleOpenChange(false) })}
          <DialogFooter className="mt-0">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}
