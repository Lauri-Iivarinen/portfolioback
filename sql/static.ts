
export const createStackPref = `CREATE TABLE IF NOT EXISTS stack(
    technologyid INTEGER PRIMARY KEY AUTOINCREMENT
    ,technology string
    );
`

export const createProjects = `CREATE TABLE IF NOT EXISTS projects(
    projectid INTEGER PRIMARY KEY not null
    ,project varchar(30)
    ,school BOOLEAN
    ,grp BOOLEAN
    ,description string
    ,link string
    );
`

export const createTechnologies = `CREATE TABLE IF NOT EXISTS technologies(
    technologyid INTEGER PRIMARY KEY AUTOINCREMENT
    ,technology string
    ,projectid integer
    ,FOREIGN KEY (projectid) REFERENCES projects(projectid)
    );
`

export const createProjectImages = `CREATE TABLE IF NOT EXISTS projectimages(
    imageid INTEGER PRIMARY KEY AUTOINCREMENT
    ,image string
    ,projectid integer
    ,FOREIGN KEY (projectid) REFERENCES projects(projectid)
    );
`

export const createWork = `CREATE TABLE IF NOT EXISTS work(
    workid INTEGER PRIMARY KEY not null
    ,date varchar(30)
    ,workTitle varchar(30)
    ,smallDescription string
    ,description string
    ,location varchar(40)
    ,icon varchar(30)
    );
`

export const createWorkImages = `CREATE TABLE IF NOT EXISTS workimages(
    imageid INTEGER PRIMARY KEY AUTOINCREMENT
    ,image string
    ,workid integer
    ,FOREIGN KEY (workid) REFERENCES work(workid)
    );
`
export const insertProjects = `INSERT INTO projects(projectid, project, school, grp, description, link) VALUES(?,?,?,?,?,?);`

export const insertProjectImage = `INSERT INTO projectimages(image, projectid) VALUES(?, ?);`

export const insertProjectTechnologies = `INSERT INTO technologies(technology, projectid) VALUES(?, ?);`

export const insertWorkImages = `INSERT INTO workimages(image, workid) VALUES(?, ?);`

export const insertWork = `INSERT INTO work(workid, date, workTitle, smallDescription, description, location, icon) VALUES(?,?,?,?,?,?,?);`

export const insertStack = `INSERT INTO stack(technology) VALUES(?);`