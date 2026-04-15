import { useState } from "react";
import { cn } from "@/lib/utils";
import { Monitor, Tablet, Smartphone } from "lucide-react";

interface DeviceMockupProps {
  desktopImage: string;
  mobileImage?: string;
  alt: string;
  className?: string;
}

type DeviceType = "desktop" | "tablet" | "mobile";

const DeviceMockup = ({ desktopImage, mobileImage, alt, className }: DeviceMockupProps) => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("desktop");

  const devices = [
    { type: "desktop" as DeviceType, icon: Monitor, label: "Desktop" },
    { type: "tablet" as DeviceType, icon: Tablet, label: "Tablet" },
    { type: "mobile" as DeviceType, icon: Smartphone, label: "Mobile" },
  ];

  const getDeviceStyles = () => {
    switch (activeDevice) {
      case "desktop":
        return "max-w-full";
      case "tablet":
        return "max-w-lg";
      case "mobile":
        return "max-w-xs";
    }
  };

  const getFrameStyles = () => {
    switch (activeDevice) {
      case "desktop":
        return "rounded-lg border-4 border-foreground/20";
      case "tablet":
        return "rounded-2xl border-8 border-foreground/20";
      case "mobile":
        return "rounded-3xl border-4 border-foreground/20";
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Device toggle */}
      <div className="flex items-center gap-2 bg-secondary/50 rounded-full p-1">
        {devices.map((device) => (
          <button
            key={device.type}
            onClick={() => setActiveDevice(device.type)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200",
              activeDevice === device.type
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <device.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{device.label}</span>
          </button>
        ))}
      </div>

      {/* Device frame */}
      <div className={cn("transition-all duration-500 ease-out", getDeviceStyles())}>
        <div className={cn("overflow-hidden bg-background shadow-elevated transition-all duration-300", getFrameStyles())}>
          {/* Browser bar for desktop */}
          {activeDevice === "desktop" && (
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/30 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-background/50 rounded-md px-4 py-1 text-xs text-muted-foreground">
                  return-a-package.lovable.app
                </div>
              </div>
            </div>
          )}

          {/* Notch for mobile */}
          {activeDevice === "mobile" && (
            <div className="flex justify-center py-2 bg-foreground/10">
              <div className="w-20 h-5 bg-foreground/20 rounded-full" />
            </div>
          )}

          {/* Image */}
          <img
            src={activeDevice === "mobile" && mobileImage ? mobileImage : desktopImage}
            alt={alt}
            className="w-full h-auto"
          />

          {/* Home indicator for mobile */}
          {activeDevice === "mobile" && (
            <div className="flex justify-center py-2 bg-foreground/10">
              <div className="w-32 h-1 bg-foreground/30 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceMockup;
