import { useAppActions } from "@/store/hooks";
import { useStore } from "@nanostores/react";
import { $activePreviewDeviceSel, $activeToolSel } from "@/store";
import React from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";

function DeviceSelectBase() {
  const activePreviewDevice = useStore($activePreviewDeviceSel);
  const activeTool = useStore($activeToolSel);
  const { setPreviewDevice } = useAppActions();
  const activeDevice = activePreviewDevice;

  // Get allowed devices based on active tool
  const getAllowedDevices = () => {
    switch (activeTool) {
      default:
        return ["desktop", "tablet", "mobile"];
    }
  };

  const allowedDevices = getAllowedDevices();

  return (
    <>
      {/* Desktop Device Selector - Only show on larger screens */}
      <div className="fixed left-4 top-1/2 hidden lg:block -translate-y-1/2 z-50">
        {/* Vertical pill container */}
        <div className="flex flex-col items-center bg-base-100/90 backdrop-blur-sm border border-base-300 rounded-3xl shadow-lg p-2 gap-2">
          {allowedDevices.map((device) => {
            const isActive = activeDevice === device;
            const icon =
              device === "mobile" ? (
                <Smartphone className="w-4 h-4" />
              ) : device === "tablet" ? (
                <Tablet className="w-4 h-4" />
              ) : (
                <Monitor className="w-4 h-4" />
              );

            return (
              <button
                title={device}
                key={device}
                onClick={() => setPreviewDevice(device as never)}
                aria-pressed={isActive}
                className={`w-10 h-10 btn btn-sm rounded-box p-0 flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "btn-primary shadow-lg scale-105"
                    : "btn-ghost hover:btn-outline hover:scale-110"
                }`}
              >
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Device Selector - Hidden on all screen sizes for now since we want to hide on smaller screens */}
      {/* You can uncomment this if you want device selection on tablets/mobile 
      <div className="fixed top-4 right-4 md:hidden lg:hidden z-50">
        <div className="flex items-center bg-base-100/90 backdrop-blur-sm border border-base-300 rounded-box shadow-lg p-1 gap-1">
          {allowedDevices.map((device) => {
            const isActive = activeDevice === device;
            const icon =
              device === "mobile" ? (
                <Smartphone className="w-3 h-3" />
              ) : device === "tablet" ? (
                <Tablet className="w-3 h-3" />
              ) : (
                <Monitor className="w-3 h-3" />
              );

            return (
              <button
                title={device}
                key={device}
                onClick={() => setPreviewDevice(device as never)}
                aria-pressed={isActive}
                className={`w-8 h-8 btn btn-xs rounded-box p-0 flex items-center justify-center transition-all duration-200 ${
                  isActive ? "btn-primary shadow-md" : "btn-ghost hover:btn-outline"
                }`}
              >
                {icon}
              </button>
            );
          })}
        </div>
      </div>
      */}
    </>
  );
}

const DeviceSelect = React.memo(DeviceSelectBase);
export default DeviceSelect;
