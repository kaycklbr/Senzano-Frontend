import React, { useState } from "react";

interface ConfirmModalProps {
    onConfirm: () => void;
    trigger: React.ReactNode;
    title?: string;
    description?: string;
}

export function ConfirmModal({
    onConfirm,
    trigger,
    title = "Tem certeza?",
    description = "Essa ação não poderá ser desfeita.",
}: ConfirmModalProps) {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    return (
        <>
            <div onClick={() => setOpen(true)} style={{ display: "inline-block" }}>
                {trigger}
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-2">{title}</h2>
                        <p className="text-sm text-gray-600 mb-4">{description}</p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded-lg  border border-gray-300 hover:bg-gray-100"
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
                                onClick={handleConfirm}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
