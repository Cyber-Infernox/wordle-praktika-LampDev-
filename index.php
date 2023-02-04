<?php
session_start();



?>

<!doctype html>
<html lang="ua">
<head>
    <meta charset="UTF-8">
    <title>Авторизація і реєстрація</title>
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>

    <!-- Форма авторизации -->

    <form>
        <label>Авторизація</label>
        <input type="text" name="login" placeholder="Введіть свій логін">
        <label>Пароль</label>
        <input type="password" name="password" placeholder="Введіть пароль">
        <button type="submit" class="login-btn">Війти</button>
        <p>
            У вас немає аккаунта? - <a href="/register.php">Зареєструватись</a>!
        
    </form>

    <script src="assets/js/jquery-3.4.1.min.js"></script>
    <script src="assets/js/main.js"></script>

</body>
</html>