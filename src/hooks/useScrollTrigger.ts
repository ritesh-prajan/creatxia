import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useScrollFadeIn(
  ref: RefObject<HTMLElement | null>,
  options: {
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    trigger?: string | HTMLElement;
  } = {}
) {
  useEffect(() => {
    if (!ref.current) return;

    const { direction = 'up', delay = 0, duration = 1.2, trigger } = options;

    let x = 0;
    let y = 0;
    if (direction === 'up') y = 50;
    else if (direction === 'down') y = -50;
    else if (direction === 'left') x = 50;
    else if (direction === 'right') x = -50;

    const anim = gsap.fromTo(
      ref.current,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trigger || ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [ref, options.direction, options.delay, options.duration, options.trigger]);
}

export function useImmersionAnimation(
  containerRef: RefObject<HTMLElement | null>,
  panelsRef: RefObject<HTMLDivElement[] | null>
) {
  useEffect(() => {
    if (!containerRef.current || !panelsRef.current) return;

    const panels = panelsRef.current;
    if (panels.length === 0) return;

    // We pin the container for 400vh
    // There are several images. The first is visible at start.
    // The others crossfade and scale in sequentially.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Make sure all panels except the first are set to opacity 0 and prepared
    panels.forEach((panel, index) => {
      const bg = panel.querySelector('.immersion-bg');
      const content = panel.querySelector('.immersion-text');

      if (index === 0) {
        // First panel starts fully visible and zooms in slightly
        gsap.set(panel, { opacity: 1, zIndex: 10 });
        gsap.set(bg, { scale: 1 });
        gsap.set(content, { opacity: 1, y: 0 });

        tl.to(bg, { scale: 1.15, duration: 1.5, ease: 'sine.inOut' });
      } else {
        // Other panels start at opacity 0, scale 1 and fade in on scroll
        gsap.set(panel, { opacity: 0, zIndex: 10 + index });
        gsap.set(bg, { scale: 1 });
        gsap.set(content, { opacity: 0, y: 50 });

        const label = `stage-${index}`;
        tl.add(label);

        // Parallel transition animations:
        // 1. Fade out previous text
        if (index > 0) {
          const prevContent = panels[index - 1].querySelector('.immersion-text');
          tl.to(prevContent, { opacity: 0, y: -50, duration: 0.5, ease: 'power2.inOut' }, label);
        }

        // 2. Fade in the panel
        tl.to(panel, { opacity: 1, duration: 1, ease: 'power2.inOut' }, label)
          // 3. Scale up incoming background image
          .to(bg, { scale: 1.15, duration: 1.5, ease: 'sine.inOut' }, label)
          // 4. Fade in and slide up incoming text
          .to(content, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, `${label}+=0.3`);
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, [containerRef, panelsRef]);
}

export function useCounterAnimation(
  elementRef: RefObject<HTMLElement | null>,
  targetValue: number,
  duration: number = 2
) {
  useEffect(() => {
    if (!elementRef.current) return;

    const obj = { value: 0 };
    const el = elementRef.current;

    const anim = gsap.to(obj, {
      value: targetValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.innerText = Math.floor(obj.value).toString();
      },
    });

    return () => {
      anim.kill();
    };
  }, [elementRef, targetValue, duration]);
}
