import { IconCloud } from "@/components/ui/icon-cloud"

const slugs = [
  "typescript",
  "react",
]

export function TechStack() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  )

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  )
}
