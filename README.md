# portfolioback
Very barebones backend for <a href="https://github.com/Lauri-Iivarinen/portfoliopage">portfoliopage</a>, WIP

## Endpoints 🦀

### GET

<Details>
    <Summary>
        /api
    </Summary>



<Summary>
    Favorite technologies 🧑‍💻
</Summary>


  ```
  /api/stack
  ```
  Returns
    ```
    string[]
    ```


<Summary>
Project 🧑‍💻
</Summary>

  ```
  /api/projects
  ```
  Returns
    ```
    Project[]
    ```
    
```
Project{
    project: string,
    school: boolean,
    group: boolean,
    description: string,
    technologies: string[],
    link: string,
    img: string[]
}
```



<Summary>
Career 🧑‍💻
</Summary>

  ```
  /api/career
  ```
Returns
    ```
    Work[]
    ```
    
  ```
  Work {
      date: string
      workTitle: string
      smallDescription: string
      description: string
      location: string
      icon: string
      img: string[]
  }
  ```

</Details>

### POST

<Details>
    <Summary>
        /api
    </Summary>



<Summary>
    Favorite technologies 🧑‍💻
</Summary>


  ```
  /api/stack
  ```

Body
```
technology: string
```

  Returns
```
count: number
```


<Summary>
Project 🧑‍💻
</Summary>

  ```
  /api/projects
  ```

Body

```
project: string,
school: boolean,
group: boolean,
description: string,
technologies: string[],
link: string,
img: string[]
```

  Returns
```
count: number
```
    

<Summary>
Career 🧑‍💻
</Summary>

  ```
  /api/career
  ```
Body
```
date: string
workTitle: string
smallDescription: string
description: string
location: string
icon: string
img: string[]
```

Returns
```
count: number
```
    

## TODO

  - Make database CRUD
