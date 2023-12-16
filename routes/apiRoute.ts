import { Router } from 'express';
import { initDb } from '../sql';
import { WorkDb, Work } from '../util/types/Work';
import { TechnologyDb, Technology } from '../util/types/Technology';
import { Project, ProjectDb } from '../util/types/Project';
import { insertProjectImage, insertProjects, insertProjectTechnologies, selectProjects, selectStack, insertStack, selectWork, insertWork, insertWorkImages } from '../sql/static';

const router = Router()
const db = initDb()

interface idFetch {
    ID: number
}

router.get('/career', async (req, res) => {
    db.all(selectWork, (err: any, result: any) => {
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

router.post('/career', async (req, res) => {
    const work: Work = req.body
    try {
        const workStmt = db.prepare(insertWork)
        const workImgStmt = db.prepare(insertWorkImages)
        //workid, date, workTitle, smallDescription, description, location, icon
        db.get('SELECT count(workid) AS ID from work;', (err, result: idFetch) => {
            workStmt.run(result.ID, work.date, work.workTitle, work.smallDescription, work.description, work.location, work.icon)
            work.img.forEach(image => {workImgStmt.run(image, result.ID)})
            workStmt.finalize()
            workImgStmt.finalize()
            res.json({count: 1})
        })
    } catch (error) {
        console.error(error)
        res.json({count: 0})
    }
})

router.get('/stack', async (req, res) => {
    db.all(selectStack, (err: any, result: any) => {
        if (err) {
            res.json(err)
        }
        res.json(result.map((row: TechnologyDb) => row.technology))
    })
})

router.get('/skills', async (req, res) => {
    db.all('SELECT DISTINCT technology from technologies;', (err, result: Technology[]) => {
        console.log(result)
        res.json(result.map(a => a.technology))
    })
    
})

router.post('/stack', async (req, res) => {
    try {
        const tech: Technology = req.body
        const stackStmt = db.prepare(insertStack)
        stackStmt.run(tech.technology)
        stackStmt.finalize()
        res.json({count: 1})
    } catch (error) {
        console.error(error)
        res.json({count: 0})
    }
})


router.get('/projects', async (req, res) => {
    db.all(selectProjects, (err: any, result: any) => {
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
                technologies: row.technologies !== null ? row.technologies.split(',') :[],
                img: row.project_images !== null ? row.project_images.split(',').reverse() : []
            }
            return object
        }))
    })
})

router.post('/projects', async (req, res) => {
    try {
        const post: Project = req.body
        let statement = db.prepare(insertProjects)
        let imgstatement = db.prepare(insertProjectImage)
        let techstatement = db.prepare(insertProjectTechnologies)
        db.get('SELECT count(projectid) AS ID from projects;', (err, result: idFetch) => {
            statement.run(result.ID, post.project, post.school, post.group, post.description, post.link)
            post.img.forEach(b => imgstatement.run(b, result.ID))
            post.technologies.forEach(b => techstatement.run(b, result.ID))
            statement.finalize()
            imgstatement.finalize()
            techstatement.finalize()
            res.json({count: 1})
        })        
    } catch (error) {
        console.error(error)
        res.json({count: 0})
    }
})

export default router