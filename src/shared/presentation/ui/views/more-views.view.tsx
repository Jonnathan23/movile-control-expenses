export function MoreView() {
    const items = [
        { icon: "🎯", label: "Presupuestos", desc: "Define límites de gasto por categoría" },
        { icon: "📊", label: "Reportes", desc: "Análisis detallado de tus finanzas" },
        { icon: "🔔", label: "Notificaciones", desc: "Alertas y recordatorios" },
        { icon: "🔒", label: "Seguridad", desc: "PIN y autenticación biométrica" },
        { icon: "⚙️", label: "Configuración", desc: "Moneda, idioma y preferencias" },
        { icon: "❓", label: "Ayuda", desc: "Centro de soporte y tutoriales" },
    ];
    return (
        <div className="p-4 md:p-8 animate-slide-up">
            <div className="max-w-2xl mx-auto space-y-3">
                {items.map((item) => (
                    <button
                        key={item.label}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl transition-colors hover:brightness-110 text-left"
                        style={{ background: "#1a5862", border: "1px solid rgba(38,160,155,0.15)" }}
                    >
                        <span
                            className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
                            style={{ background: "rgba(38,160,155,0.15)" }}
                            aria-hidden="true"
                        >
                            {item.icon}
                        </span>
                        <div>
                            <p className="font-semibold text-white text-sm">{item.label}</p>
                            <p className="text-xs" style={{ color: "#85c9c0" }}>
                                {item.desc}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
