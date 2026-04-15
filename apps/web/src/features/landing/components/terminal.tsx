import {
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"

export function InstallationTerminal() {
  return (
    <Terminal>
      <TypingAnimation>npm install walker/core walker/react</TypingAnimation>
    </Terminal>
  )
}
