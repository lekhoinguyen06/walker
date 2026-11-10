import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Item } from "walker-react";
import { useState } from "react";
import { ade } from "@/walker/ade";

export function DialogDemo() {
  const [name, setName] = useState("Pedro Duarte");
  const [username, setUsername] = useState("@peduarte");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
      }}
    >
      <form>
        <Item {...ade.pdt}>
          <DialogTrigger
            render={<Button variant="outline">Open Dialog</Button>}
          />
        </Item>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Item {...ade.pdin}>
                <Input
                  id="name-1"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Item>
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Item {...ade.pdiu}>
                <Input
                  id="username-1"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Item>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Item {...ade.pdc}>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
            </Item>
            <Item {...ade.pds}>
              <Button type="submit" onClick={() => setIsOpen(false)}>
                Save changes
              </Button>
            </Item>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
