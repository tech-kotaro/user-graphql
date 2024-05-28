<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

              <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  </head>
        <!-- Styles -->
        <style>
            .wrapper{
                text-align: center;
            }
        </style>
    </head>
    <body class="font-sans antialiased dark:bg-black dark:text-white/50">
        <div class="wrapper bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
            <header>
                <h2>
                ポケモン検索
                </h2>
            </header>
            <div class="body">
                <input type="text" placeholder="ポケモンの名前を入力してください">
                <button href="">検索</button>
            </div>
        </div>
    </body>
</html>
