                
            <header class="stage-home container">
                <div class="content">
                    <h1 class="tl1"><?php echo $args["title"]?></h1>
                    <div class="intro"><?php echo $args["intro"]?></div>
                </div>
                <picture>
                    <source srcset="<?php echo $args["image"]["small"]?>" media="(max-width: 499px)">
                    <source srcset="<?php echo $args["image"]["large"]?>" media="(min-width: 500px)">
                    <img src="<?php echo $args["image"]["small"]?>" alt="">
                </picture>
            </header>
