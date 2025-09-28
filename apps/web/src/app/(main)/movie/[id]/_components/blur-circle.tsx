interface BlurCircleProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}
export const BlurCircle = ({
  top = 'auto',
  left = 'auto',
  right = 'auto',
  bottom = 'auto',
}: BlurCircleProps) => {
  return (
    <div
      className="absolute z-50 h-52 w-52 aspect-square rounded-full bg-rose-500/30 blur-3xl"
      style={{ top: top, left: left, right: right, bottom: bottom }}
    ></div>
  );
};
