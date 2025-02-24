import { useEffect } from 'react'

export default function WelcomeInfo() {
    // Función para crear instancias de animaciones Rive
    const createRiveInstance = (canvasId: string, artboardName: string, stateMachineName: string) => {
        const canvasElement: HTMLElement | null = document.getElementById(canvasId) 
        if (!canvasElement) {
            console.error(`Canvas with id "${canvasId}" not found.`)
            return
        }

        try {
            // @ts-ignore
            return new rive.Rive({
                src: '/animations/icons.riv',
                canvas: canvasElement,
                autoplay: true,
                artboard: artboardName,
                stateMachines: stateMachineName,
            })
        } catch (error) {
            console.error(`Error initializing Rive animation for ${canvasId}:`, error)
        }
    }

    // Inicialización de animaciones cuando el componente se monta
    useEffect(() => {
        const animations = [
            { id: 'canvas-arrows', artboard: 'Arrows', stateMachine: 'State Machine 1' },
            { id: 'canvas-aircraft', artboard: 'Aircraft', stateMachine: 'State Machine 1' },
            { id: 'canvas-lock', artboard: 'Lock', stateMachine: 'State Machine 1' },
            { id: 'canvas-support', artboard: 'Support', stateMachine: 'State Machine 1' },
        ]
        animations.forEach(({ id, artboard, stateMachine }) => {
            createRiveInstance(id, artboard, stateMachine)
        })
    }, [])

    return (
        <ul className="flex items-center justify-center space-x-20 select-none">
            {/* Compra 100% segura */}
            <li className="flex items-center justify-center space-x-4 relative">
                <canvas
                    id="canvas-lock"
                    width="220"
                    height="60"
                    className="absolute -top-[20px] -left-[45px]"></canvas>
                <p className="font-semibold">Compra 100% segura</p>
            </li>
            {/* Envíos nacionales */}
            <li className="flex items-center justify-center space-x-4 relative">
                <canvas
                    id="canvas-aircraft"
                    width="220"
                    height="60"
                    className="absolute -top-[18px] -left-[45px]"></canvas>
                <div>
                    <p className="font-semibold">Envíos nacionales</p>
                </div>
            </li>
            {/* Servicio al cliente */}
            <li className="flex items-center justify-center space-x-4 relative">
                <canvas
                    id="canvas-support"
                    width="220"
                    height="60"
                    className="absolute -top-[0px] -left-[50px]"></canvas>
                <div className="mt-5">
                    <p className="font-semibold">Servicio al cliente</p>
                    <p className="text-sm">Lun - Vie, 9am - 5pm</p>
                </div>
            </li>
            {/* Cambios y devoluciones gratis */}
            <li className="flex items-center justify-center space-x-4 relative">
                <canvas
                    id="canvas-arrows"
                    width="220"
                    height="60"
                    className="absolute -top-[20px] -left-[65px]"></canvas>
                <p className="font-semibold">Cambios y devoluciones gratis</p>
            </li>
        </ul>
    )
}
