import sqlite3 from "sqlite3";

const checkDb: () => void = () => {
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

checkDb()