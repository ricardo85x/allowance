import { toast } from "react-toastify"
import { ReactNode } from "react"

export const notify = (message: string |ReactNode, type: "alert" | "error" | "success"| "info") => {

    toast[type](message, {
        toastId: message
    })
} 