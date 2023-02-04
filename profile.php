<?php
session_start();
if (!$_SESSION['user']) {
    header('Location: /');
}
?>

<!doctype html>
<html lang="ua">
<head>
    <meta charset="UTF-8">
    <title>Авторизація і реєстрація</title>
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>

    <!-- Профиль -->

    <form>
        <img src="<?= $_SESSION['user']['avatar'] ?>" width="200" alt="">
        <h2 style="margin: 10px 0;">Ваш логін: <?= $_SESSION['user']['full_name'] ?></h2>
        <a href="#">Ваша електронна адреса:  <?= $_SESSION['user']['email'] ?></a>
        <p></p>
         <a href="index.html" class="logout">Грати в гру</a>
         <p></p>
        <a href="vendor/logout.php" class="logout">Вихід</a>
    </form>

</body>
</html>