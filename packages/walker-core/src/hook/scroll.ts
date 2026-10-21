import type { HookPropsType } from "walker-shared";

export async function scroll(props: HookPropsType): Promise<void> {
  const walker = document.getElementById(props.action.targetId);
  const element = walker?.firstElementChild;

  if (element instanceof HTMLElement) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    // Wait for the scroll to finish
    //     await new Promise((resolve) => {
    //       const observer = new IntersectionObserver(
    //         (entries) => {
    //           if (entries[0]?.isIntersecting) {
    //             observer.disconnect();
    //             resolve(null);
    //           }
    //         },
    //         {
    //           threshold: 0.5,
    //         },
    //       );
    //
    //       observer.observe(element);
    //     });
    await new Promise<void>((resolve) => {
      let lastTop = element.getBoundingClientRect().top;
      let stableFrames = 0;

      const check = () => {
        const top = element.getBoundingClientRect().top;

        if (Math.abs(top - lastTop) < 0.5) {
          stableFrames++;
        } else {
          stableFrames = 0;
        }

        lastTop = top;

        if (stableFrames >= 3) {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };

      requestAnimationFrame(check);
    });
  }
}
