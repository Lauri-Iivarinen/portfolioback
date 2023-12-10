export interface Work {
    date: string
    workTitle: string
    smallDescription: string
    description: string
    location: string
    icon: string
    img: string[]
}

export interface WorkDb {
    workid: number
    date: string
    workTitle: string
    smallDescription: string
    description: string
    location: string
    icon: string
    work_images: string | null
}