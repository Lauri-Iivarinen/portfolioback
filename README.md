# portfolioback
Very barebones backend for <a href="https://github.com/Lauri-Iivarinen/portfoliopage">portfoliopage</a>, WIP

## Endpoints 🦀

<Details>
    <Summary>
        /api
    </Summary>


<Details>
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
</Details>
<Details>
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
</Details>

<Details>
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
</Details>
# TODO

  - Make database CRUD
