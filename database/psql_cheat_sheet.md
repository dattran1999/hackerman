# PSQL Command

## From Command Line

### To Add file 
```
psql -f <.sql> -U postgres <dbName>
```

### createdb
```
createdb -U postgres <dbName>
```

### Go to database
```
psql -U postgres <dbname>
```

## From Database

### Create DB
```
postgres=# create database dbName;
```
Note: Dont write postgres=#

