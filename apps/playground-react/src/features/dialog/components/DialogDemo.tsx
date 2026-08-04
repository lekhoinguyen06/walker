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
import { Item } from "@repo/react";

export function DialogDemo() {
  return (
    <Item
      id="dialog-demo"
      description="This is example dialog for the Walker Playground, try open it and fill in the details!"
    >
      <Dialog>
        <form>
          <Item id="dialog-trigger" description="Click to open the dialog">
            <DialogTrigger
              render={<Button variant="outline">Open Dialog</Button>}
            />
          </Item>
          <Item id="dialog-content" description="The content of the dialog">
            <DialogContent className="sm:max-w-sm">
              <Item id="dialog-header" description="The header of the dialog">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
              </Item>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1">Name</Label>
                  <Item id="name-input" description="The input for the name">
                    <Input
                      id="name-1"
                      name="name"
                      defaultValue="Pedro Duarte"
                    />
                  </Item>
                </Field>
                <Field>
                  <Label htmlFor="username-1">Username</Label>
                  <Item
                    id="username-input"
                    description="The input for the username"
                  >
                    <Input
                      id="username-1"
                      name="username"
                      defaultValue="@peduarte"
                    />
                  </Item>
                </Field>
              </FieldGroup>
              <DialogFooter>
                <Item
                  id="dialog-trigger-close"
                  description="Click to close the dialog without saving changes"
                >
                  <DialogClose
                    render={<Button variant="outline">Cancel</Button>}
                  />
                </Item>
                <Item
                  id="dialog-save"
                  description="Click to save changes and close the dialog"
                >
                  <Button type="submit">Save changes</Button>
                </Item>
              </DialogFooter>
            </DialogContent>
          </Item>
        </form>
      </Dialog>
    </Item>
  );
}
