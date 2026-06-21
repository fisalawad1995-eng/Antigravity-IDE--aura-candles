import { cn } from "@/lib/utils";

export const BackgroundGlow = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Strong Yellow Glow */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, rgba(255, 235, 100, 0.35) 0%, rgba(255, 235, 100, 0) 70%)`,
        }}
      />
      {/* Strong Orange Glow */}
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, rgba(255, 120, 50, 0.2) 0%, rgba(255, 120, 50, 0) 70%)`,
        }}
      />
    </div>
  );
};

export default BackgroundGlow;
