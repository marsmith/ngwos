# HABS Water Quality Data Viewer

## To convert ADCP .csv data files into database:

### First export new table creation SQL
- clean up (delete) extraneous .csv header lines
- connect to CSV with dBeaver flat file connection
- right click CSV table in dBeaver and choose 'Export Data'
- select 'Database' as target type and click 'Next' and 'Next' again
- click 'DDL' button at bottom of window and copy the contents
- paste contents in text editor such as notepad++
- close export window in dBeaver
- make sure column headings are encased in backquotes
- set type of 'TIMESTAMP' to 'DATETIME'
- for the rest of the ADCP fields, set field type to 'INT(11)'
- in your new database, open an SQL editor and paste in the edited table creation SQL that you edited
- run the SQL statement to create the new table

### Next do actual data import
- right click CSV table in dBeaver and choose 'Export Data'
- select 'Database' as target type and click 'Next' and 'Next' again
- choose an existing database as the 'Target container'
- click 'Finish' to import data

### Do some optimization

Create indexes in queryable date field
```
CREATE INDEX raw_date_time_IDX ON habs.Owasco_ADCP (`TIMESTAMP`);
CREATE INDEX raw_date_time_IDX ON habs.Seneca_ADCP (`TIMESTAMP`);
CREATE INDEX raw_date_time_IDX ON habs.SkanPlatform_ADCP (`TIMESTAMP`);
```

add primary key field
```
ALTER TABLE habs.Owasco_ADCP ADD `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE habs.Seneca_ADCP ADD `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE habs.SkanPlatform_ADCP ADD `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
```
