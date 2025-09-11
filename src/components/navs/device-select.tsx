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
      {/* Desktop Device Selector */}
      <div className="fixed left-4 top-1/2 hidden md:block -translate-y-1/2 z-50">
        {/* Vertical pill container */}
        <div className="flex flex-col items-center bg-base-100 border border-base-300 rounded-full shadow-md p-2 gap-2">
          {allowedDevices.map((device) => {
            const isActive = activeDevice === device;
            const icon =
              device === "mobile" ? (
                <Smartphone className="h-4 w-4" />
              ) : device === "tablet" ? (
                <Tablet className="h-4 w-4" />
              ) : (
                <Monitor className="h-4 w-4" />
              );

            return (
              <button
                title={device}
                key={device}
                onClick={() => setPreviewDevice(device as never)}
                aria-pressed={isActive}
                className={`w-10 h-10 btn btn-sm rounded-full p-0 flex items-center justify-center transition-transform duration-150 ease-out transform ${
                  isActive
                    ? "btn-primary shadow-lg scale-105"
                    : "btn-ghost hover:scale-110"
                }`}
              >
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Device Selector */}
      <div className="fixed top-4 right-4 md:hidden z-50">
        <div className="flex items-center bg-base-100 border border-base-300 rounded-full shadow-md p-1 gap-1">
          {allowedDevices.map((device) => {
            const isActive = activeDevice === device;
            const icon =
              device === "mobile" ? (
                <Smartphone className="h-3 w-3" />
              ) : device === "tablet" ? (
                <Tablet className="h-3 w-3" />
              ) : (
                <Monitor className="h-3 w-3" />
              );

            return (
              <button
                title={device}
                key={device}
                onClick={() => setPreviewDevice(device as never)}
                aria-pressed={isActive}
                className={`w-8 h-8 btn btn-xs rounded-full p-0 flex items-center justify-center transition-all duration-150 ${
                  isActive ? "btn-primary shadow-md" : "btn-ghost"
                }`}
              >
                {icon}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

const DeviceSelect = React.memo(DeviceSelectBase);
export default DeviceSelect;
