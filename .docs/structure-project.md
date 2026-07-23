# Estructura del Proyecto

Este documento describe la estructura de alto nivel del repositorio, el cual incluye tanto el código fuente de la aplicación frontend (React) como el proyecto nativo para Android.

## Vista General

El proyecto se divide principalmente en dos grandes bloques:

- `src/`: Código fuente principal de la aplicación (Frontend en React).
- `android/`: Proyecto nativo de Android gestionado e integrado mediante Capacitor.

---

## 1. Aplicación Frontend (`src/`)

La carpeta `src/` sigue un enfoque de **Clean Architecture** estructurado mediante **Feature-Sliced Design**, buscando máxima escalabilidad e independencia.

```text
src/
├── App.tsx                    # Componente raíz
├── main.tsx                   # Punto de entrada de React
├── config/                    # Configuraciones globales (ej. TanStack Query)
├── features/                  # Módulos de la aplicación (ej. expenses, budget)
│   └── [nombre-feature]/      # Cada feature es totalmente independiente
│       ├── core/              # Lógica de Negocio (Domain, Application, Infrastructure, DI)
│       └── presentation/      # Lógica Visual (Components, Hooks, React Context)
└── shared/                    # Recursos compartidos por toda la app
    ├── core/                  # Adaptadores genéricos (ej. UUID, Intl), helpers, errores
    └── ui/                    # Componentes visuales genéricos y agnósticos
```

_Para profundizar en cómo interactúan las capas dentro de cada feature, revisa la documentación de la [Arquitectura](architecture)._

---

## 2. Proyecto Nativo Android (`android/`)

Dado que este proyecto está diseñado para funcionar en dispositivos móviles utilizando **Capacitor**, la carpeta `android/` contiene un proyecto funcional nativo listo para ser abierto en **Android Studio**.

```text
android/
├── app/                                  # Módulo principal de la aplicación nativa
│   ├── src/main/                         # Código fuente nativo (Java/Kotlin), AndroidManifest y res/ (íconos)
│   ├── build.gradle                      # Configuración de compilación (dependencias y versiones)
│   └── capacitor.build.gradle            # Integración de configuraciones nativas de Capacitor
├── capacitor-cordova-android-plugins/    # Módulo autogenerado que maneja los plugins de Capacitor/Cordova instalados
├── build.gradle                          # Archivo de construcción global del proyecto Android
├── settings.gradle                       # Define qué módulos están incluidos en el proyecto
└── gradle/                               # Wrapper de Gradle (permite compilar sin tener Gradle instalado globalmente)
```

> [!TIP]
> **¿Debo modificar el código de Android manualmente?**  
> El **99% del desarrollo se realiza en la carpeta `src/`**. La carpeta `android/` rara vez se toca manualmente, excepto para:
>
> 1. Añadir permisos nativos en el `AndroidManifest.xml` (ej. uso de cámara o ubicación).
> 2. Configurar variables de entorno nativas, versiones de SDK (`build.gradle` o `variables.gradle`).
> 3. Añadir íconos nativos y Splash Screens.
>
> Cualquier cambio en el frontend (`src/`) se sincroniza automáticamente o mediante el comando de Capacitor hacia el proyecto nativo.
