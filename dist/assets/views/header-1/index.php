<?php global $navigation;?>
    <header role="banner" class="container<?php if(isset($args["options"])): echo " ".$args["options"]; endif;?>">
        <div class="content">
            <img class="logo" src="assets/img/logo.svg" alt="logo">
            
            <button type="button" class="btn-nav"></button>
            
            <nav role="navigation">
                <ul>
                    <?php $nav = $navigation; ?>
                    <?php for($i = 0; $i < sizeof($nav); $i++): $item = $nav[$i];?>
                    <li>
                        <a href="<?= $item["href"]?>" <?php if($_SERVER['REQUEST_URI'] == $item["href"]) :?> class="active" <?php endif;?>><?= $item["name"]?></a>
                    </li>
                    <?php endfor; ?>
                </ul>
            </nav>
        </div>
    </header>
