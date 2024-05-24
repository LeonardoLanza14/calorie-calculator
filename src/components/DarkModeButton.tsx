import { useEffect, useState } from "react"
import { BiSolidMoon } from "react-icons/bi";
import { BiSolidSun } from "react-icons/bi";

const DarkModeButton = () => {
    const [theme, setTheme] = useState(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark'
        }
        return 'light'

    })

    useEffect(() => {
        if (theme === "dark") {
            document.querySelector('html')?.classList.add('dark')
        } else {
            document.querySelector('html')?.classList.remove('dark')
        }
    }, [theme])

    const handleChangeTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    return (
        <>
            {theme === "dark" ? (
                <button onClick={handleChangeTheme}>
                    <BiSolidSun className=" text-white hover:text-gray-400 size-8" />
                </button>
            ) : (
                <button onClick={handleChangeTheme}>
                    <BiSolidMoon className=" text-black hover:text-gray-700 size-8" />
                </button>
            )}

        </>
    )
}

export default DarkModeButton