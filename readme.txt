REST api for managing movies list

available apis
**************
1.application base
2.add movie
3.get movies
4.get a movie
5.edit movie
6.delete a movie
7.search movie by name

1)application base
  url:/
  method:GET
  params:
  query:
  body:

2)application base
  url:/movie
  method:POST
  params:
  query:
  body:{"name":"24",
        "director":"Vikram Kumar",
        "releaseDate":"May 6, 2016",
        "duration":164,
        "cast":["Suriya","Samantha Ruth Prabhu","Nithya Menen"],
        "language":"THAMIL"}

3)get movies
  url:/movie
  method:GET
  params:
  query:
  body:

4)get a movie
  url:/movie/<id>
  method:GET
  params:id
  query:
  body:

5)edit movie
  url:/movie/<id>
  method:PUT
  params:id
  query:
  body:{"name":"24",
        "director":"Vikram Kumar",
        "releaseDate":"May 6, 2016",
        "duration":164,
        "cast":["Suriya","Samantha Ruth Prabhu","Nithya Menen"],
        "language":"THAMIL"}

6)delete movie
  url:/movie/<id>
  method:DELETE
  params:id
  query:
  body:

6)search movie by name
  url:/movie/<name>
  method:GET
  params:name
  query:
  body:


  
  
