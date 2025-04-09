import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useEffect } from "react";

export const SmoothScrollHero = () => {
  return (
    <>
      {/* Only wrap the Hero component with ReactLenis */}
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Hero />
      </ReactLenis>
    </>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  const lenis = useLenis();

  // Reset scroll position when component mounts
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full bg-zinc-950"
    >
      <CenterImage />
      <ParallaxImages />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-40 md:top-0 h-[40vh] md:h-screen w-full rounded-xl"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(/assets/workspace.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/assets/signin.png"
        start={-150}
        end={150}
        className="w-1/2 md:w-1/3 rounded-xl"
      />
      <ParallaxImg
        src="/assets/website.png"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-xl"
      />
      <ParallaxImg
        src="/assets/website2.png"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded-xl"
      />
      <ParallaxImg
        src="/assets/website3.png"
        alt="Orbiting satellite"
        start={0}
        end={-300}
        className="ml-6 md:ml-24 w-5/12  rounded-xl"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};