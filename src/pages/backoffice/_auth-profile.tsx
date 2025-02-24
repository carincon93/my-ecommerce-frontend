import { useStore } from '@nanostores/react'
import { $userStore } from '@clerk/astro/client'
import { useEffect, useState } from 'react'

interface AuthProfileProps {}

export default function AuthProfile() {
    const [firstName, setFirstName] = useState<string>('')
    const user = useStore($userStore)

    const getFirstName = () => {
        if (user?.firstName) {
            setFirstName(user?.firstName)
        }
    }

    useEffect(() => {
        getFirstName()
    }, [user])

    return (
        <section>
            <h1
                className="text-4xl font-bold max-md:text-center"
                style={{ viewTransitionName: 'backoffice-text' }}>
                ¡Bienvenido {firstName}!
            </h1>
        </section>
    )
}
