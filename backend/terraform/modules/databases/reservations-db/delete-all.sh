#!bin/bas
HOST="YOUR RDS URL HERE"

mysql --host=$HOST --port=3306 --user=root --password=mariomariomario --database=reservationsDB << EOF
DELETE FROM Reservation;
EOF