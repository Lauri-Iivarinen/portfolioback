import sqlite3 from "sqlite3";
import workData from '../util/static/workData.json'
import projectData from '../util/static/projectData.json'
import stack from '../util/static/stackPref.json'
import {
    createStackPref,
    createProjects,
    createProjectImages,
    createTechnologies,
    createWork,
    createWorkImages,
    insertStack,
    insertProjects,
    insertProjectImage,
    insertProjectTechnologies,
    insertWork,
    insertWorkImages
} from "./static";


const checkDb = () => {
    const db = new sqlite3.Database('database.db')

    db.all('SELECT technology FROM stack', (err: any, result: any) => {
        if (err) console.log(err)
        console.log(result)
    })

    db.all(`SELECT projects.projectid, projects.project, projects.school, projects.grp, projects.description, projects.link,
    GROUP_CONCAT(DISTINCT technologies.technology) AS technologies,
    GROUP_CONCAT(DISTINCT projectimages.image) AS project_images
    FROM projects
    LEFT JOIN technologies ON projects.projectid = technologies.projectid
    LEFT JOIN projectimages ON projects.projectid = projectimages.projectid
    GROUP BY projects.projectid;`, (err: any, result: any) => {
        if (err) console.log(err)
        console.log(result[0])
    })

    db.all(`SELECT work.workid, work.date, work.workTitle, work.smallDescription, work.description, work.location, work.icon, 
    GROUP_CONCAT(DISTINCT workimages.image) as work_images
    FROM work
    LEFT JOIN workimages ON work.workid = workimages.workid
    GROUP BY work.workid;`, (err: any, result: any) => {
        if (err) console.log(err)
        console.log(result[0])
    })
}

const initDb = () => {
    const db = new sqlite3.Database('database.db')

    db.serialize(() => {
        db.run(createStackPref)
        
        db.run(createProjects)
        db.run(createProjectImages)
        db.run(createTechnologies)
        db.run(createWork)
        db.run(createWorkImages)
    
        let statement = db.prepare(insertStack);
        stack.forEach(a => {
            statement.run(a);
        })

        statement = db.prepare(insertProjects)
        let imgstatement = db.prepare(insertProjectImage)
        let techstatement = db.prepare(insertProjectTechnologies)

        projectData.forEach((a, i) => {
            statement.run(i, a.project, a.school, a.group, a.description, a.link)
            a.img.forEach(b => imgstatement.run(b, i))
            a.technologies.forEach(b => techstatement.run(b, i))
        })

        statement = db.prepare(insertWork)
        imgstatement = db.prepare(insertWorkImages)
        workData.forEach((a, i) => {
            statement.run(i, a.date, a.workTitle, a.smallDescription, a.description, a.location, a.icon)
            a.img.forEach(b => imgstatement.run(b, i))
        })
        
        statement.finalize();

    })
}

//initDb()

checkDb()
