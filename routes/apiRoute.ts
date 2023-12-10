import { Router } from 'express';
import { initDb } from '../sql';
import { WorkDb, Work } from '../util/types/Work';
import { TechnologyDb } from '../util/types/Technology';
import { Project, ProjectDb } from '../util/types/Project';

const router = Router()
const db = initDb()

router.get('/career', async (req, res) => {
    db.all(`SELECT work.workid, work.date, work.workTitle, work.smallDescription, work.description, work.location, work.icon, 
    GROUP_CONCAT(DISTINCT workimages.image) as work_images
    FROM work
    LEFT JOIN workimages ON work.workid = workimages.workid
    GROUP BY work.workid;`, (err: any, result: any) => {
        if (err) {
            res.json(err)
        }
        res.json(result.map((row: WorkDb) => {
            const object: Work = {
                date: row.date,
                workTitle: row.workTitle,
                smallDescription: row.smallDescription,
                description: row.description,
                location: row.location,
                icon: row.icon,
                img: row.work_images !== null ? row.work_images.split(',') : []
            }
            return object
        }))
    })
})

router.get('/stack', async (req, res) => {
    db.all('SELECT technology FROM stack', (err: any, result: any) => {
        if (err) {
            res.json(err)
        }
        res.json(result.map((row: TechnologyDb) => row.technology))
    })
})

router.get('/projects', async (req, res) => {
    db.all(`SELECT projects.projectid, projects.project, projects.school, projects.grp, projects.description, projects.link,
    GROUP_CONCAT(DISTINCT technologies.technology) AS technologies,
    GROUP_CONCAT(DISTINCT projectimages.image) AS project_images
    FROM projects
    LEFT JOIN technologies ON projects.projectid = technologies.projectid
    LEFT JOIN projectimages ON projects.projectid = projectimages.projectid
    GROUP BY projects.projectid;`, (err: any, result: any) => {
        if (err) {
            res.json(err)
        }
        res.json(result.map((row: ProjectDb) => {
            const object: Project = {
                project: row.project,
                school: row.school === 1? true: false,
                group: row.grp === 1? true: false,
                description: row.description,
                link: row.link,
                technologies: row.technologies !== null ? row.technologies.split(','):[],
                img: row.project_images !== null ? row.project_images.split(',') : []
            }
            return object
        }))
    })
})

export default router