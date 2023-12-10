export interface Project{
    project: string,
    school: boolean,
    group: boolean,
    description: string,
    technologies: string[],
    link: string,
    img: string[]
}

export interface ProjectDb{
    projectid: number
    project: string
    school: number
    grp: number
    description: string
    link: string
    technologies: string
    project_images: string
}