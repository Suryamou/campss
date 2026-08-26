import React from "react";

export type AdminModalType = "alert" | "confirm" | "success";

interface AdminModalProps {
  isOpen: boolean;
  type: AdminModalType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function AdminModal({
  isOpen,
  type,
  title,
  message,
  onConfirm,
  onCancel,
  onClose,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
}: AdminModalProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    if (onCancel) onCancel();
    onClose();
  };

  const isAlert = type === "alert";
  const isSuccess = type === "success";

  // Ikon & Warna sesuai tipe
  let icon = "⚠️";
  let iconBg = "bg-yellow-100";
  let titleColor = "text-yellow-700";
  
  if (isAlert) {
    icon = "❌";
    iconBg = "bg-red-100";
    titleColor = "text-red-700";
  } else if (isSuccess) {
    icon = "✅";
    iconBg = "bg-emerald-100";
    titleColor = "text-emerald-700";
  } else {
    // Confirm default (usually warning/delete)
    iconBg = "bg-amber-100";
    titleColor = "text-[#063d2b]";
  }

  return (
    <>
      <style>{`
        @keyframes popUp {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-popup {
          animation: popUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#063d2b]/40 px-6 backdrop-blur-sm transition-opacity">
        <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl animate-popup">
          <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${iconBg} text-3xl shadow-inner`}>
            {icon}
          </div>
          <h3 className={`mt-5 text-xl font-bold ${titleColor}`}>{title}</h3>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            {message}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {type === "confirm" ? (
              <>
                <button
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                  className="w-full rounded-xl bg-red-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                  {confirmText}
                </button>
                <button
                  onClick={handleClose}
                  className="w-full rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  {cancelText}
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-[#063d2b] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#052f22]"
              >
                Tutup
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
