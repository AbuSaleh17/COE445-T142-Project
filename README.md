# COE445-T142-Project (Smart Prayer carpet)

This the source code for our Course Project. The project implemnted in RaspBerry pi

Team Member:
Mahdi Ali Al Mayuf 200962830,
Hassan Abdulmunem Al-Shabaan 200968350.

Instructor: Dr. Yahya Esmail Osais

-------------------------------------------------------------------------------------------------------------------------
Guidelines:

After connecting all wires to RaspBerry pi pins:
Connect ethernet cable to it and also Connect the power cable.

Now you have to get the ip for RaspBerry pi. There is many ways to get it. These are two ways to get the ip.
First way: get it from router or modem.
Second way: ping the hostname of RaspBerry pi by this command "ping raspberrypi". (You can use "raspberrypi" to connect to RaspBerry pi instead of ip)

After getting the ip address for RaspBerry pi you can connect to it by these way:
(For windows machine) use Remote Desktop Connection to connect to it.(There is program installed in RaspBerry pi to enable Remote Desktop Connection)
Using SSH program like (PuTTY - http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) to get the command windows for RaspBerry pi.

Aftrer conncting to RaspBerry pi:
You have to prepare the mongodb setting by writing the command in ini.txt into command window.
If the mongodb not running try this command "sudo /etc/init.d/mongod start".
Run init.js to write temp some date in mongodb to test the mongodb. command "sudo node init.js".

Now all settings are ready. You can run the program (Prayer.js) now. command "sudo node Prayer.js".

There are photos in photos file, They may help you.

If you have any Questions:
Email: s200962830@kfupm.edu.sa

Written in 26/05/2015.
