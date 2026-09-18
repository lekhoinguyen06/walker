import type { HookPropsType } from "./hook.dto";

export async function scroll(props: HookPropsType): Promise<void> {
  const walker = document.getElementById(props.action.targetId);
  const element = walker?.firstElementChild;

  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    // Wait for the scroll to finish
    await new Promise((resolve) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            observer.disconnect();
            resolve(null);
          }
        },
        {
          threshold: 0.5,
        },
      );

      observer.observe(element);
    });
  }
}
