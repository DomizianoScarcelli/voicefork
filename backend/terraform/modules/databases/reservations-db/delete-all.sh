#!bin/bas
HOST=mysql-reservations.cbtzosmh5abb.us-east-1.rds.amazonaws.com

mysql --host=$HOST --port=3306 --user=root --password=mariomariomario --database=reservationsDB << EOF
DELETE FROM Reservation;
EOF