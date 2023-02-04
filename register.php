<?php
    session_start();
    
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Авторизация и регистрация</title>
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>

    <!-- Форма регистрации -->

    <form>
        <label>ПІБ</label>
        <input type="text" name="full_name" placeholder="Введіть своє повне ім'я">
        <label>Логин</label>
        <input type="text" name="login" placeholder="Введіть свій логін">
        <label>Почта</label>
        <input type="email" name="email" placeholder="Введіть адрес електронной почти">
        <label>Зображення профілю</label>
        <input type="file" name="avatar">
        <label>Пароль</label>
        <input type="password" name="password" placeholder="Введіть пароль">
        <label>Підтверження  пароля</label>
        <input type="password" name="password_confirm" placeholder="Підтвердіть пароль">
        <button type="submit" class="register-btn">Зареєструватись</button>
        <p>
            У вас уже є аккаунт? - <a href="/">Авторизуйтесь</a>!
        </p>
    </form>
    <script src="assets/js/jquery-3.4.1.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>