# wordle
wordle project

Якщо у вас не працює Авторізація/Реєстрація - потрібно перейти в файл "db_conn.php" та залишити пустим це поле: "$pass = "root"; 
Далі перейти в папку Vendor та зайти в файл "connect.php" Знайти це : "$connect = mysqli_connect('localhost', 'root', 'root', 'test');"
Замість 2го "root" залишити пусте поле.
