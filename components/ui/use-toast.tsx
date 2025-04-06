import { createContext, useContext, useState } from "react";

type Toast = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

type ToastContextType = {
  toast: (toast: Toast) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (newToast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((t, index) => (
          <div
            key={index}
            className={`p-4 rounded shadow ${
              t.variant === "destructive"
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            <strong>{t.title}</strong>
            {t.description && <p className="text-sm">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
