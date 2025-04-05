import { useSpring, animated } from "@react-spring/web";

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  animate?: boolean;
}

const Bar = ({ x, y, width, height, fill, animate = true }: BarProps) => {
  const springProps = useSpring({
    from: animate ? { height: 0, y: y + height } : { height, y },
    to: { height, y },
    config: animate ? { tension: 90, friction: 40 } : { tension: 0, friction: 0 },
  });

  return animate ? (
    <animated.rect
      x={x}
      y={springProps.y}
      width={width}
      height={springProps.height}
      fill={fill}
    />
  ) : (
    <rect x={x} y={y} width={width} height={height} fill={fill} />
  );
};

export default Bar;