import { useAppStore } from "@/store/hooks";
import { observer } from "mobx-react-lite";

function DeviceSelect() {
  const store = useAppStore();
  const activeDevice = store.activePreviewDevice;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="group relative">
        {/* Collapsed state - Circle showing active device */}
        <div className="w-12 h-12 bg-base-300 border border-base-300 rounded-full shadow-lg flex items-center justify-center transition-all duration-700 ease-out group-hover:w-0 group-hover:opacity-0">
          <span className="text-sm font-medium text-base-content transition-all duration-300">
            {activeDevice?.charAt(0)?.toUpperCase() || "D"}
          </span>
        </div>

        {/* Expanded state - Full navigation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-700 ease-out overflow-hidden">
          <div className="flex items-center bg-base-100 border border-base-300 rounded-full shadow-xl px-4 py-2 gap-2 h-12 whitespace-nowrap">
            {store.allowedPreviewDevices.map((device, index) => (
              <button
                key={device}
                onClick={() => store.setPreviewDevice(device)}
                className={`btn btn-sm rounded-full transition-all duration-300 ease-out hover:scale-105 normal-case ${
                  activeDevice === device
                    ? "btn-primary shadow-md"
                    : "btn-ghost hover:btn-accent"
                }`}
                style={{
                  transitionDelay: `${700 + index * 100}ms`,
                  opacity: 0,
                  transform: "scale(0.8)",
                  animation: `fadeInScale 0.3s ease-out ${700 + index * 100}ms forwards`,
                }}
              >
                {device}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation for buttons */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .group:not(:hover) button {
          animation: fadeOutScale 0.2s ease-out forwards;
        }

        @keyframes fadeOutScale {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}

export default observer(DeviceSelect);
