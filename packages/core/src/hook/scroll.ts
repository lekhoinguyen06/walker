import type { HookPropsType, HookResponseType } from "./hook.dto";

export async function scroll(props: HookPropsType): HookResponseType {
  const walker = document.getElementById(props.action.target);
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
